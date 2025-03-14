import { afterEach, beforeEach, describe, expect, it } from 'bun:test'
import { LogLevel } from '../constants'
import { Logger } from '../logger'

class ConsoleCapture {
  private messages: string[] = []
  private originalConsole: typeof console

  constructor() {
    this.originalConsole = { ...console }
    this.clear()
    this.setupMocks()
  }

  clear(): void {
    this.messages = []
  }

  private setupMocks(): void {
    console.log = (...args: unknown[]) => this.messages.push(args.join(' '))
    console.error = (...args: unknown[]) => this.messages.push(args.join(' '))
    console.warn = (...args: unknown[]) => this.messages.push(args.join(' '))
    console.info = (...args: unknown[]) => this.messages.push(args.join(' '))
    console.debug = (...args: unknown[]) => this.messages.push(args.join(' '))
  }

  restore(): void {
    Object.assign(console, this.originalConsole)
  }

  getMessages(): string[] {
    return [...this.messages]
  }

  getLastMessage(): string | undefined {
    return this.messages[this.messages.length - 1]
  }
}

describe('Logger', () => {
  let logger: Logger
  let consoleCapture: ConsoleCapture
  const mockDate = new Date('2024-01-01T12:00:00.000Z')
  const originalDate = global.Date

  beforeEach(() => {
    logger = new Logger()
    consoleCapture = new ConsoleCapture()

    // Mock Date to always return the same timestamp
    global.Date = (() => mockDate) as unknown as DateConstructor
  })

  afterEach(() => {
    consoleCapture.restore()
    global.Date = originalDate
  })

  describe('Configuration', () => {
    it('should use default configuration', () => {
      const config = logger.getConfig()
      expect(config.level).toBe(LogLevel.default)
      expect(config.enabled).toBe(true)
      expect(config.timestamps).toBe(false)
      expect(config.prefix).toBeUndefined()
    })

    it('should update configuration', () => {
      logger.configure({
        level: LogLevel.error,
        timestamps: true,
        prefix: '[Test]',
      })

      const config = logger.getConfig()
      expect(config.level).toBe(LogLevel.error)
      expect(config.timestamps).toBe(true)
      expect(config.prefix).toBe('[Test]')
    })

    it('should clone logger with same configuration', () => {
      logger.configure({
        level: LogLevel.error,
        timestamps: true,
        prefix: '[Test]',
      })

      const clonedLogger = logger.clone()
      expect(clonedLogger.getConfig()).toEqual(logger.getConfig())
    })
  })

  describe('Log Levels', () => {
    it('should respect silent level', () => {
      logger.configure({ level: LogLevel.silent })

      logger.error('test')
      logger.warn('test')
      logger.info('test')
      logger.debug('test')

      expect(consoleCapture.getMessages()).toEqual([])
    })

    it('should only show errors when error level is set', () => {
      logger.configure({ level: LogLevel.error })

      logger.error('test')
      logger.warn('test')
      logger.info('test')

      expect(consoleCapture.getMessages()).toEqual(['test'])
    })

    it('should show all logs when verbose level is set', () => {
      logger.configure({ level: LogLevel.verbose })

      logger.error('test')
      logger.warn('test')
      logger.info('test')
      logger.debug('test')
      logger.trace('test')

      expect(consoleCapture.getMessages().length).toBe(5)
    })
  })

  describe('Log Types', () => {
    beforeEach(() => {
      logger.configure({ level: LogLevel.verbose }) // Enable all logs
      consoleCapture.clear()
    })

    it('should format fatal logs correctly', () => {
      logger.fatal('Fatal error')
      expect(consoleCapture.getLastMessage()).toBe('Fatal error')
    })

    it('should format error logs correctly', () => {
      logger.error('Error message')
      expect(consoleCapture.getLastMessage()).toBe('Error message')
    })

    it('should format warning logs correctly', () => {
      logger.warn('Warning message')
      expect(consoleCapture.getLastMessage()).toBe('Warning message')
    })

    it('should format info logs correctly', () => {
      logger.info('Info message')
      expect(consoleCapture.getLastMessage()).toBe('Info message')
    })

    it('should format success logs correctly', () => {
      logger.success('Success message')
      expect(consoleCapture.getLastMessage()).toBe('Success message')
    })

    it('should format fail logs correctly', () => {
      logger.fail('Fail message')
      expect(consoleCapture.getLastMessage()).toBe('Fail message')
    })

    it('should format debug logs correctly', () => {
      logger.debug('Debug message')
      expect(consoleCapture.getLastMessage()).toBe('Debug message')
    })

    it('should format trace logs correctly', () => {
      logger.trace('Trace message')
      expect(consoleCapture.getLastMessage()).toBe('Trace message')
    })

    it('should format box logs correctly', () => {
      logger.box('Box message')
      const messages = consoleCapture.getMessages()
      expect(messages.length).toBe(3)
    })
  })

  describe('Message Formatting', () => {
    beforeEach(() => {
      consoleCapture.clear()
    })

    it('should add timestamps when enabled', () => {
      logger.configure({ timestamps: true })
      logger.log('Test message')
      expect(consoleCapture.getLastMessage()).toBe('[2024-01-01T12:00:00.000Z] Test message')
    })

    it('should add prefix when set', () => {
      logger.configure({ prefix: '[Test]' })
      logger.log('Test message')
      expect(consoleCapture.getLastMessage()).toBe('[Test] Test message')
    })

    it('should combine multiple arguments', () => {
      logger.log('Hello', 'World', 123)
      expect(consoleCapture.getLastMessage()).toBe('Hello World 123')
    })

    it('should format with both timestamp and prefix', () => {
      logger.configure({
        timestamps: true,
        prefix: '[Test]',
      })
      logger.log('Test message')
      expect(consoleCapture.getLastMessage()).toBe('[2024-01-01T12:00:00.000Z] [Test] Test message')
    })
  })
})

import { LoggerConfig } from './config'
import type { LoggerConfigOptions } from './config'
import type { LogType } from './constants'

/**
 * Logger class for consistent logging with configurable options
 * @method getConfig - Get current logger configuration
 * @method configure - Update logger configuration
 * @method fatal - Log a fatal error
 * @method error - Log an error
 * @method warn - Log a warning
 * @method info - Log an information message
 * @method success - Log a success message
 * @method fail - Log a failure message
 * @method log - Log a message
 * @method debug - Log a debug message
 * @method trace - Log a trace message
 * @method box - Log a message in a box
 * @method clone - Clone the logger instance
 */
export class Logger {
  private config: LoggerConfig

  constructor(options: LoggerConfigOptions = {}) {
    this.config = new LoggerConfig(options)
  }

  /**
   * Get current logger configuration
   */
  getConfig(): LoggerConfig {
    return this.config
  }

  /**
   * Update logger configuration
   */
  configure(options: LoggerConfigOptions): void {
    this.config.update(options)
  }

  /**
   * Format log message with timestamp and prefix if enabled
   */
  private formatMessage(message: string): string {
    const parts: string[] = []

    if (this.config.timestamps) {
      parts.push(`[${new Date().toISOString()}]`)
    }

    if (this.config.prefix) {
      parts.push(this.config.prefix)
    }

    parts.push(message)
    return parts.join(' ')
  }

  /**
   * Internal logging method
   */
  private _log(type: LogType, ...args: unknown[]): void {
    if (!this.config.isLevelEnabled(type)) {
      return
    }

    const message = this.formatMessage(args.join(' '))

    switch (type) {
      case 'fatal':
      case 'error':
        console.error(message)
        break
      case 'warn':
        console.warn(message)
        break
      case 'info':
      case 'success':
      case 'fail':
      case 'log':
        console.info(message)
        break
      case 'debug':
      case 'trace':
        console.debug(message)
        break
      case 'box': {
        const boxWidth = 52 // Fixed width for the box
        const horizontalLine = `┌${'─'.repeat(boxWidth - 2)}┐`
        const bottomLine = `└${'─'.repeat(boxWidth - 2)}┘`

        // Split message into lines if it contains newlines
        const lines = message.split('\n')

        console.log(horizontalLine)
        for (const line of lines) {
          // Ensure each line fits within the box
          const maxTextWidth = boxWidth - 4 // Account for borders and minimum padding
          const truncatedLine =
            line.length > maxTextWidth ? `${line.slice(0, maxTextWidth - 3)}...` : line

          // Calculate padding for centering
          const totalPadding = maxTextWidth - truncatedLine.length
          const leftPadding = Math.floor(totalPadding / 2)
          const rightPadding = totalPadding - leftPadding

          console.log(
            `│${' '.repeat(leftPadding + 1)}${truncatedLine}${' '.repeat(rightPadding + 1)}│`,
          )
        }
        console.log(bottomLine)
        break
      }
    }
  }

  // Public logging methods
  fatal(...args: unknown[]): void {
    this._log('fatal', ...args)
  }

  error(...args: unknown[]): void {
    this._log('error', ...args)
  }

  warn(...args: unknown[]): void {
    this._log('warn', ...args)
  }

  info(...args: unknown[]): void {
    this._log('info', ...args)
  }

  success(...args: unknown[]): void {
    this._log('success', ...args)
  }

  fail(...args: unknown[]): void {
    this._log('fail', ...args)
  }

  log(...args: unknown[]): void {
    this._log('log', ...args)
  }

  debug(...args: unknown[]): void {
    this._log('debug', ...args)
  }

  trace(...args: unknown[]): void {
    this._log('trace', ...args)
  }

  box(...args: unknown[]): void {
    this._log('box', ...args)
  }

  /**
   * Create a new logger instance with the same configuration
   */
  clone(): Logger {
    return new Logger(this.config.clone())
  }
}

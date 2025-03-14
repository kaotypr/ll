/**
 * Log levels in ascending order of severity
 */
export const LogLevel = {
  // Silent
  silent: -999,
  // Error
  error: 0,
  // Warning
  warn: 1,
  // Default
  default: 2,
  // Informational
  info: 3,
  // Verbose
  verbose: 4,
} as const

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]

/**
 * Default log level if none is specified
 */
export const DEFAULT_LOG_LEVEL = LogLevel.default

/**
 * Available log types for the logger
 */
export type LogType =
  | 'fatal'
  | 'error'
  | 'warn'
  | 'log'
  | 'info'
  | 'success'
  | 'fail'
  | 'box'
  | 'debug'
  | 'trace'

/**
 * Log Type Map to Log Level
 */
export const LogTypeLevel: Record<LogType, LogLevel> = {
  // Fatal and Error
  fatal: LogLevel.error,
  error: LogLevel.error,
  // Warning
  warn: LogLevel.warn,
  // Default
  log: LogLevel.default,
  // Informational
  info: LogLevel.info,
  success: LogLevel.info,
  fail: LogLevel.info,
  box: LogLevel.info,
  // Verbose
  debug: LogLevel.verbose,
  trace: LogLevel.verbose,
}

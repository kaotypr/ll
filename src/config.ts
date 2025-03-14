import { DEFAULT_LOG_LEVEL, LogLevel, LogTypeLevel } from './constants'
import type { LogType } from './constants'

export interface LoggerConfigOptions {
  /**
   * Minimum log level to display
   * @default LogLevel.default
   */
  level?: LogLevel
  /**
   * Whether to enable/disable logging
   * @default true
   */
  enabled?: boolean
  /**
   * Whether to include timestamps in log messages
   * @default false
   */
  timestamps?: boolean
  /**
   * Custom prefix for log messages
   * @default undefined
   */
  prefix?: string
}

/**
 * Logger configuration
 * @constructor
 * @see {@link LoggerConfigOptions} for configuration options
 * @param {LogLevel} options.level - Minimum log level to display
 * @param {boolean} options.enabled - Whether to enable/disable logging
 * @param {boolean} options.timestamps - Whether to include timestamps in log messages
 * @param {string} options.prefix - Custom prefix for log messages
 */
export class LoggerConfig {
  private _level: LogLevel
  private _enabled: boolean
  private _timestamps: boolean
  private _prefix?: string

  constructor(options: LoggerConfigOptions = {}) {
    this._level = options.level ?? DEFAULT_LOG_LEVEL
    this._enabled = options.enabled ?? true
    this._timestamps = options.timestamps ?? false
    this._prefix = options.prefix
  }

  /**
   * Get current log level
   */
  get level(): LogLevel {
    return this._level
  }

  /**
   * Set new log level
   */
  set level(value: LogLevel) {
    this._level = value
  }

  /**
   * Check if logging is enabled
   */
  get enabled(): boolean {
    return this._enabled
  }

  /**
   * Enable/disable logging
   */
  set enabled(value: boolean) {
    this._enabled = value
  }

  /**
   * Check if timestamps are enabled
   */
  get timestamps(): boolean {
    return this._timestamps
  }

  /**
   * Enable/disable timestamps
   */
  set timestamps(value: boolean) {
    this._timestamps = value
  }

  /**
   * Get current prefix
   */
  get prefix(): string | undefined {
    return this._prefix
  }

  /**
   * Set new prefix
   */
  set prefix(value: string | undefined) {
    this._prefix = value
  }

  /**
   * Check if a specific log type should be displayed based on current level
   */
  isLevelEnabled(type: LogType): boolean {
    if (!this._enabled || this._level === LogLevel.silent) {
      return false
    }

    const typeLevel = LogTypeLevel[type]
    return typeLevel <= this._level
  }

  /**
   * Create a new config instance with the same settings
   */
  clone(): LoggerConfig {
    return new LoggerConfig({
      level: this._level,
      enabled: this._enabled,
      timestamps: this._timestamps,
      prefix: this._prefix,
    })
  }

  /**
   * Update config with new options
   */
  update(options: LoggerConfigOptions): void {
    if (options.level !== undefined) this._level = options.level
    if (options.enabled !== undefined) this._enabled = options.enabled
    if (options.timestamps !== undefined) this._timestamps = options.timestamps
    if (options.prefix !== undefined) this._prefix = options.prefix
  }
}

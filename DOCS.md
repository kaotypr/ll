# @kaotypr/ll Documentation

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Log Levels](#log-levels)
- [API Reference](#api-reference)
- [Examples](#examples)

## Installation

```bash
# Using npm
npm install @kaotypr/ll

# Using yarn
yarn add @kaotypr/ll

# Using pnpm
pnpm add @kaotypr/ll

# Using bun
bun add @kaotypr/ll
```

## Configuration

The logger can be configured with the following options:

```typescript
interface LoggerConfigOptions {
  level?: LogLevel;      // Minimum log level to display (default: LogLevel.default)
  enabled?: boolean;     // Enable/disable logging (default: true)
  timestamps?: boolean;  // Include timestamps in messages (default: false)
  prefix?: string;      // Custom prefix for messages (default: undefined)
}
```

Example:
```typescript
import { Logger, LogLevel } from '@kaotypr/ll'

const logger = new Logger({
  level: LogLevel.info,
  timestamps: true,
  prefix: '[MyApp]'
})
```

## Log Levels

Available log levels in order of severity (lowest to highest):

```typescript
LogLevel.silent   // -999: No logs
LogLevel.error    // 0: Errors only
LogLevel.warn     // 1: Warnings and errors
LogLevel.default  // 2: Default level
LogLevel.info     // 3: Informational messages
LogLevel.verbose  // 4: Verbose logging
```

## API Reference

### Logging Methods

```typescript
logger.fatal(...args: unknown[])   // Fatal errors (uses error level)
logger.error(...args: unknown[])   // Error messages
logger.warn(...args: unknown[])    // Warning messages
logger.info(...args: unknown[])    // Info messages
logger.success(...args: unknown[]) // Success messages (uses info level)
logger.fail(...args: unknown[])    // Failure messages (uses info level)
logger.log(...args: unknown[])     // Standard log messages (uses default level)
logger.debug(...args: unknown[])   // Debug messages (uses verbose level)
logger.trace(...args: unknown[])   // Trace messages (uses verbose level)
logger.box(...args: unknown[])     // Boxed messages (uses info level)
```

### Configuration Methods

```typescript
// Get current configuration
const config = logger.getConfig()

// Update configuration
logger.configure({
  level: LogLevel.debug,
  timestamps: true
})

// Create a new logger with the same configuration
const newLogger = logger.clone()
```

## Examples

### Basic Usage

```typescript
import { Logger, LogLevel } from '@kaotypr/ll'

const logger = new Logger()

logger.info('Hello, world!')
logger.error('Something went wrong:', new Error('Oops!'))
logger.success('Operation completed successfully')
```

### Using Box Format

```typescript
logger.box('Welcome to MyApp!', 'Version 1.0.0')
// Output:
// ┌──────────────────────────────────────────────────────┐
// │                  Welcome to MyApp!                   │
// │                   Version 1.0.0                      │
// └──────────────────────────────────────────────────────┘
```

### Dynamic Configuration

```typescript
const logger = new Logger({ level: LogLevel.error })

// Only errors will be shown
logger.info('This will not be shown')
logger.error('This will be shown')

// Update to show all logs
logger.configure({ level: LogLevel.verbose })

// Now everything will be shown
logger.info('This will be shown')
logger.debug('This will also be shown')
```

### Using Timestamps and Prefix

```typescript
const logger = new Logger({
  timestamps: true,
  prefix: '[MyApp]'
})

logger.info('Server started')
// Output: [2024-03-14T12:00:00.000Z] [MyApp] Server started

logger.error('Connection failed')
// Output: [2024-03-14T12:00:00.000Z] [MyApp] Connection failed
``` 
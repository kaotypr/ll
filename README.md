# @kaotypr/ll

A super lightweight logger library focused on supporting debugging. Zero dependencies, customizable log levels, and a clean, simple API for console output formatting.

## Installation

```bash
npm install @kaotypr/ll
```

## Quick Start

```typescript
import { Logger, LogLevel } from '@kaotypr/ll'

const logger = new Logger({
  level: LogLevel.info,    // Set minimum log level
  timestamps: true,        // Enable timestamps
  prefix: '[MyApp]'        // Add custom prefix
})

logger.info('Server started')
// Output: [2024-03-14T12:00:00.000Z] [MyApp] Server started

logger.configure({
  timestamps: false,
  prefix: 'LL: ',
})

logger.box('Welcome to MyApp!')
// Output:
// ┌──────────────────────────────────────────────────────┐
// │              LL: Welcome to MyApp!                   │
// └──────────────────────────────────────────────────────┘
```

For detailed usage and API documentation, see [DOCS.md](https://github.com/kaotypr/ll/blob/main/DOCS.md)
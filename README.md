# VSCode Quick Logging Extension

A Visual Studio Code extension that helps you quickly add different types of logging statements to your code. This extension allows you to add success, info, warning, error, and debug logs with simple keyboard shortcuts.

## Features

- Add different types of log statements with keyboard shortcuts
- Supports 5 log levels: success, info, warning, error, and debug
- Automatically formats logs using the `AppLogs` logger
- Preserves selected variable names in log statements

## Installation

1. Open Visual Studio Code
2. Press `Ctrl+P` to open the Quick Open dialog
3. Type `ext install quick-logging` and press Enter
4. Restart VS Code after installation

## Usage

1. Select a variable or expression in your code
2. Use one of the following keyboard shortcuts to add a log statement:
   - Success Log: `Ctrl+Alt+S`
   - Info Log: `Ctrl+Alt+I`
   - Warning Log: `Ctrl+Alt+W`
   - Error Log: `Ctrl+Alt+E`
   - Debug Log: `Ctrl+Alt+D`

The extension will insert a new line with the appropriate log statement. For example:

```typescript
const userName = "John";  // Select "userName"
// Press Ctrl+Alt+I
AppLogs.info('userName: $userName');  // Generated log statement
```

## Available Commands

You can also access the logging functions through the command palette (`Ctrl+Shift+P`):
- `Add Success Log`
- `Add Info Log`
- `Add Warning Log`
- `Add Error Log`
- `Add Debug Log`

## Requirements

- Visual Studio Code version 1.60.0 or higher
- The `AppLogs` logger should be available in your project

## Extension Settings

This extension contributes the following keyboard shortcuts:

| Command | Shortcut | Description |
|---------|----------|-------------|
| Add Success Log | `Ctrl+Alt+S` | Adds a success level log |
| Add Info Log | `Ctrl+Alt+I` | Adds an info level log |
| Add Warning Log | `Ctrl+Alt+W` | Adds a warning level log |
| Add Error Log | `Ctrl+Alt+E` | Adds an error level log |
| Add Debug Log | `Ctrl+Alt+D` | Adds a debug level log |

## Known Issues

- All shortcuts require editor focus to work
- Only works with single-line selections currently

## Release Notes

### 1.0.0

Initial release of VSCode Quick Logging Extension:
- Added support for 5 log levels
- Implemented keyboard shortcuts
- Added command palette integration

## Contributing

Feel free to submit issues and enhancement requests on our GitHub repository.

## License

This extension is licensed under the MIT License.
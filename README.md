# Flutter Easy Logger Extension for VS Code

A VS Code extension that helps you quickly add logging statements to your Dart code. The extension allows you to insert customizable log statements with different log levels (debug, info, warning, error, success) while automatically handling string interpolation.

## Features

- Quick insertion of log statements with different severity levels
- Automatic string interpolation for Dart variables
- Preserves code indentation
- Customizable logger class name and method names
- Support for both simple variables and object properties

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Flutter Easy Logger"
4. Click Install

## Usage

1. Select a variable or expression in your Dart code
2. Use one of the following commands to insert a log statement:
   - Add Debug Log
   - Add Info Log
   - Add Warning Log
   - Add Error Log
   - Add Success Log

### Example

If you have this Dart code and select the variable `userName`:
```dart
String userName = 'John';
```

Using "Add Info Log" command will insert:
```dart
String userName = 'John';
AppLog.info('userName: $userName');
```

If you select a property like `user.email`, it will properly interpolate:
```dart
AppLog.info('user.email: ${user.email}');
```

## Keyboard Shortcuts

### Windows/Linux
- Debug Log: `Ctrl+Alt+D`
- Info Log: `Ctrl+Alt+I`
- Warning Log: `Ctrl+Alt+W`
- Error Log: `Ctrl+Alt+E`
- Success Log: `Ctrl+Alt+S`

### macOS
- Debug Log: `Control ⌃ + Option ⌥ + D`
- Info Log: `Control ⌃ + Option ⌥ + I`
- Warning Log: `Control ⌃ + Option ⌥ + W`
- Error Log: `Control ⌃ + Option ⌥ + E`
- Success Log: `Control ⌃ + Option ⌥ + S`

You can customize these shortcuts in VS Code's Keyboard Shortcuts settings (File > Preferences > Keyboard Shortcuts).

## Configuration

You can customize the logger class name and method names through VS Code settings:

1. Open VS Code Settings (File > Preferences > Settings)
2. Search for "Custom Logging"
3. Modify the following settings:

```json
{
    "customLogging.loggerClass": "AppLog",  // Change the logger class name
    "customLogging.methodNames": {
        "debug": "debug",     // Change debug method name
        "success": "success", // Change success method name
        "info": "info",       // Change info method name
        "error": "error",     // Change error method name
        "warning": "warning"  // Change warning method name
    }
}
```

### Example Logger Configuration

If you want to use a [Logger](https://pub.dev/packages/logger) class and method names:

```json
{
    "customLogging.loggerClass": "Logger",
    "customLogging.methodNames": {
        "debug": "d",
        "success": "s",
        "info": "i",
        "error": "e",
        "warning": "w"
    }
}
```

This would generate logs like:
```dart
Logger.d('userName: $userName');
```

### Example Custom Logger Configuration

If you want to use a your own custom logger class and method names:

```dart
import 'dart:developer';

import 'package:flutter/foundation.dart';

enum LogLevel {
  success,
  info,
  warning,
  debug,
  error,
}

class AppLog {
  AppLog._();

  static LogLevel _currentLogLevel = LogLevel.info;

  static bool enableReleaseLogging = false;

  static final Map<LogLevel, LogStyle> _styles = {
    LogLevel.success: const LogStyle(emoji: '🟢', colorCode: '32'),
    LogLevel.info: const LogStyle(emoji: '🔵', colorCode: '36'),
    LogLevel.warning: const LogStyle(emoji: '🟠', colorCode: '33'),
    LogLevel.error: const LogStyle(emoji: '🚫', colorCode: '31'),
    LogLevel.debug: const LogStyle(emoji: '⚪️', colorCode: '37'),
  };

  static String get _getCurrentTime {
    final DateTime now = DateTime.now();
    return '${now.hour}:${now.minute}:${now.second}';
  }

  static void setLogLevel(LogLevel level) {
    _currentLogLevel = level;
  }

  static void success(String message, [String tag = 'Success']) =>
      _log(message, tag, LogLevel.success);

  static void info(String message, [String tag = 'Info']) =>
      _log(message, tag, LogLevel.info);

  static void warning(String message, [String tag = 'Warning']) =>
      _log(message, tag, LogLevel.warning);

  static void debug(String message, [String tag = 'Debug']) =>
      _log(message, tag, LogLevel.debug);

  static void error(String message,
          [String tag = 'Error', Map<String, dynamic>? metadata]) =>
      _log(message, tag, LogLevel.error, metadata: metadata);

  static void _log(
    String message,
    String tag,
    LogLevel level, {
    Map<String, dynamic>? metadata,
  }) {
    if ((kDebugMode || enableReleaseLogging) &&
        level.index >= _currentLogLevel.index) {
      final style = _styles[level]!;
      final metaInfo =
          metadata != null ? ' | Metadata: ${metadata.toString()}' : '';
      log(
        '${style.emoji} \x1B[${style.colorCode}m$tag: $message$metaInfo\x1B[0m',
        name: _getCurrentTime,
        level: level.index,
      );
    }
  }

  static void setLogStyle(LogLevel level, LogStyle style) {
    _styles[level] = style;
  }
}

class LogStyle {
  const LogStyle({required this.colorCode, required this.emoji});
  final String colorCode;
  final String emoji;
}

```

This would generate logs like:
```dart
AppLog.error('$error');
```


## Requirements

- VS Code 1.60.0 or higher
- Dart/Flutter project

## License

This extension is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Feel free to submit issues and enhancement requests on our GitHub repository.

## Release Notes

### 1.0.0
- Initial release
- Basic logging functionality
- Configurable logger class and method names
- Keyboard shortcuts for all log types

// extension.ts
import * as vscode from 'vscode';

interface LogMethodNames {
    debug: string;
    success: string;
    info: string;
    error: string;
    warning: string;
}

function getConfig() {
    const config = vscode.workspace.getConfiguration('customLogging');
    return {
        loggerClass: config.get<string>('loggerClass') || 'AppLog',
        methodNames: config.get<LogMethodNames>('methodNames') || {
            debug: 'debug',
            success: 'success',
            info: 'info',
            error: 'error',
            warning: 'warning'
        }
    };
}

function insertLog(editor: vscode.TextEditor, logType: string, selectedText: string) {
    const config = getConfig();
    const document = editor.document;
    const selection = editor.selection;
    const line = document.lineAt(selection.active.line);
    
    // Get the current line's indentation
    const currentIndentation = line.text.match(/^\s*/)?.[0] || '';
    
    // Ensure selected text is interpolated properly in Dart
    const variableWithInterpolation = selectedText.includes('.') ? 
        `\${${selectedText}}` : 
        `\$${selectedText}`;
    
    // Use configured class and method names
    const methodName = config.methodNames[logType as keyof LogMethodNames];
    const logStatement = `${currentIndentation}${config.loggerClass}.${methodName}('${selectedText}: ${variableWithInterpolation}');`;
    
    editor.edit(editBuilder => {
        // Insert the log statement after the current line
        editBuilder.insert(line.range.end, `\n${logStatement}`);
    });
}

export function activate(context: vscode.ExtensionContext) {
    const logTypes = ['success', 'info', 'warning', 'error', 'debug'];
    
    // Watch for configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('customLogging')) {
                // Reload the configuration
                const config = getConfig();
                // You could add additional handling here if needed
            }
        })
    );

    logTypes.forEach(logType => {
        const commandName = `extension.add${logType.charAt(0).toUpperCase() + logType.slice(1)}Log`;
        const disposable = vscode.commands.registerCommand(commandName, () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active editor found!');
                return;
            }

            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showErrorMessage('No text selected!');
                return;
            }

            insertLog(editor, logType, selectedText);
        });
        
        context.subscriptions.push(disposable);
    });
}

export function deactivate() {}
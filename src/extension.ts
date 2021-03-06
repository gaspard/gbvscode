'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('gb.typeToTag', () => {
    const editor = vscode.window.activeTextEditor
    if ( ! editor ) {
      return
    }
    
    const selection = editor.selection
    const line = new vscode.Selection
    ( selection.anchor.line
    , 0
    , selection.anchor.line + 1
    , 0
    )
    const text = editor.document.getText ( line )
    const op = ( t: string ) => {
      if ( t.includes ( 'State' ) ) {
        return t.replace ( 'typeof State.', 'state`' ).replace ( '\n', '' ) + '`\n'
      } else if ( t.includes ( 'Signal' ) ) {
        return t.replace ( 'typeof Signal.', 'signal`' ).replace ( '\n', '' ) + '`\n'
      } else {
        return t
      }
    }

    editor.edit
    ( builder => {
        builder.insert ( line.anchor.translate ( 1 ), op ( text ) )
      }
    )
  })

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {
}
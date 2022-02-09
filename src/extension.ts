import * as vscode from "vscode";
import * as path from "path";
import { TextEncoder } from "util";

export async function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    async () => {
      if (vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage(
          `Active editors amount: ${vscode.window.visibleTextEditors.length}`
        );
        vscode.window.visibleTextEditors.forEach((editor, index) => {
          vscode.window.showInformationMessage(
            `Editor ${index} shows: ${editor.document.uri.fsPath}`
          );
        });
      }
    }
  );
  context.subscriptions.push(disposable);
}

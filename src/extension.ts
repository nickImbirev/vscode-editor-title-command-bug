import * as vscode from "vscode";
import * as path from "path";
import { TextEncoder } from "util";

export async function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    async () => {
      if (vscode.workspace.workspaceFolders) {
        const currentWorkspace = vscode.workspace.workspaceFolders[0];
        const file1Path = path.join(currentWorkspace.uri.fsPath, "/test1.txt");
        await vscode.workspace.fs.writeFile(
          vscode.Uri.file(file1Path),
          new TextEncoder().encode("sample1")
        );
        const file2Path = path.join(currentWorkspace.uri.fsPath, "/test2.txt");
        await vscode.workspace.fs.writeFile(
          vscode.Uri.file(file2Path),
          new TextEncoder().encode("sample2")
        );
        const file3Path = path.join(currentWorkspace.uri.fsPath, "/test3.txt");
        await vscode.workspace.fs.writeFile(
          vscode.Uri.file(file3Path),
          new TextEncoder().encode("sample3")
        );
        await vscode.window.showTextDocument(vscode.Uri.file(file1Path));
        await vscode.commands.executeCommand(
          "vscode.diff",
          vscode.Uri.file(file2Path),
          vscode.Uri.file(file3Path)
        );
        await vscode.commands.executeCommand(
          "workbench.action.closeActiveEditor"
        );
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

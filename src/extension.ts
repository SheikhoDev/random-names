// ______ I don't know TypeScript, so I created the code using AI. ______
// ______ I couldn't find such an extension, and since it's useful, I thought I'd publish it. ______

import * as vscode from 'vscode';
import { NAMES } from './names'; // Importing our list of 2000+ names

export function activate(context: vscode.ExtensionContext) {
    // Show a small notification when the extension is loaded
    vscode.window.showInformationMessage('Type "random_name" to insert a random name!');
    
    /**
     * Register a CompletionItemProvider.
     * The '*' means it works in all file types (Python, JS, C++, etc.).
     */
    const provider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: '*' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                // The label that appears in the autocomplete suggestion list
                const completionItem = new vscode.CompletionItem('random_name', vscode.CompletionItemKind.Variable);
                
                // Select a random name from the imported NAMES array
                const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
                
                // Define the text to be inserted: The name wrapped in quotes
                completionItem.insertText = `"${randomName}"`;
                
                // Add a description and detail to the suggestion box
                completionItem.detail = "Random Name Generator";
                completionItem.documentation = new vscode.MarkdownString("Inserts a randomly selected international name in quotes.");
                
                return [completionItem];
            }
        }
    );

    // Add the provider to the context's subscriptions so it gets cleaned up properly
    context.subscriptions.push(provider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
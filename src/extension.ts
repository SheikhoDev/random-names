import * as vscode from 'vscode';
import { NAMES } from './names';

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('Type random_name for an random name...!');
    
    // Wir registrieren einen "CompletionItemProvider"
    // '*' bedeutet: Funktioniert in allen Dateitypen (Python, JS, C++ etc.)
    const provider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: '*' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                // Das ist der Vorschlag, der in der Liste erscheint
                const completionItem = new vscode.CompletionItem('random_name', vscode.CompletionItemKind.Variable);
                
                // Wir wählen einen zufälligen Namen aus der Liste
                const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
                
                // Hier legen wir fest, was eingefügt wird: Der Name in Anführungszeichen
                completionItem.insertText = `"${randomName}"`;
                
                // Eine kleine Beschreibung im Vorschlagsfenster
                completionItem.documentation = new vscode.MarkdownString("Fügt einen zufälligen Namen in Anführungszeichen ein.");
                
                return [completionItem];
            }
        }
    );

    context.subscriptions.push(provider);
}

export function deactivate() {}
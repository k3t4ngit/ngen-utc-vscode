import Util from 'ngentest/lib/util';

const vscode = require('vscode');
const ngentest = require('ngentest');
const fs = require('fs');
const ngentestConf = require('./ngentest.config');



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "ngen-utc-vscode" is now active!');
	let disposable = vscode.commands.registerCommand('ngen-utc-vscode.ngUTC', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const fPathArr = document.fileName.split("\\");
			const fileNameArr = fPathArr.pop()?.split(".") || [];
			const specFilePath = fPathArr.join("\\");
			if (fileNameArr.length && fileNameArr[fileNameArr.length - 1] === 'ts') {
				if (fileNameArr.includes('spec') || fileNameArr.includes('generated-spec')) {
					vscode.window.showErrorMessage('This seems to be a spec file!');
					return;
				}
				fileNameArr[fileNameArr.length - 1] = 'spec';
				fileNameArr[fileNameArr.length] = 'ts';
				const specFileName = fileNameArr.join('.');
				const specFileFullPath = specFilePath + '\\' + specFileName;
				if (fs.existsSync(specFileFullPath)) {
					vscode.window
						.showInformationMessage("Spec File already exists please choose what do you want to do?", "Overwrite", "Create New and Compare")
						.then(answer => {
							if (answer === "Create New and Compare") {
								fileNameArr[fileNameArr.length - 2] = "generated.spec";
								const generatedSpecFileName = fileNameArr.join('.');
								const generatedSpecFileFullPath = specFilePath + '\\' + generatedSpecFileName;
								createNewSpec(generatedSpecFileFullPath, document.getText());
							} else if (answer === "Overwrite") {
								createNewSpec(specFileFullPath, document.getText());
								return;
							}
						})
				} else {
					createNewSpec(specFileFullPath, document.getText());
					return;
				}
			} else {
				vscode.window.showErrorMessage('Invalid File!');
				return;
			}
		} else {
			vscode.window.showErrorMessage('No active editor!');
			return;
		}
	});

	context.subscriptions.push(disposable);
}

function createNewSpec(specFileFullPath, tsCode) {
	Util.FRAMEWORK = ngentestConf.framework;
	const specFileContent = ngentest(tsCode, ngentestConf);
	fs.writeFile(specFileFullPath, specFileContent, (err) => {
		if (err) { throw err; }
		console.log('Spec file generated successfully');
		var openPath = vscode.Uri.parse("file:///" + specFileFullPath);
		vscode.workspace.openTextDocument(openPath).then(doc => {
			vscode.window.showTextDocument(doc).then(() => {
				vscode.commands.executeCommand('editor.action.organizeImports').then(() => {
					vscode.commands.executeCommand('workbench.action.files.save');
					vscode.window.showInformationMessage('Specs have been created!');
				});

			});

		});
	});
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

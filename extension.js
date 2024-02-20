const vscode = require('vscode');
const ngentest = require('ngentest');
const fs = require('fs');
const ngentestConf = require('./ngentest.config');
const Util = require('ngentest/lib/util.js');
const path = require('path');


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
				if (fileNameArr.includes('spec')) {
					vscode.window.showErrorMessage('This seems to be a spec file!');
					return;
				}
				fileNameArr[fileNameArr.length - 1] = 'spec';
				fileNameArr[fileNameArr.length] = 'ts';
				const specFileName = fileNameArr.join('.');
				const specFileFullPath = specFilePath + '\\' + specFileName;
				if (fs.existsSync(specFileFullPath)) {
					vscode.window
						.showInformationMessage("Spec File already exists please choose what do you want to do?", "Overwrite", "Create Temp and Compare")
						.then(answer => {
							if (answer === "Create Temp and Compare") {
								createTempSpec(document.getText());
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

function createTempSpec(tsCode) {
	const specFileContent = genSpec(tsCode);
	const newFile = vscode.Uri.parse('untitled:' + path.join(vscode.workspace.rootPath, 'temp.spec.ts'));
	closeFileIfOpen(newFile);
	vscode.workspace.openTextDocument(newFile).then(document => {
		const edit = new vscode.WorkspaceEdit();
		edit.insert(newFile, new vscode.Position(0, 0), specFileContent);
		return vscode.workspace.applyEdit(edit).then(success => {
			if (success) {
				vscode.window.showTextDocument(document);
			} else {
				vscode.window.showInformationMessage('Error!');
			}
		});
	});
}

function createNewSpec(specFileFullPath, tsCode) {
	const specFileContent = genSpec(tsCode);
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

function genSpec(tsCode) {
	try {
		Util.FRAMEWORK = ngentestConf.framework;
		return ngentest(tsCode, ngentestConf);
	} catch (e) {
		vscode.window.showErrorMessage('Cannot generate Specs! Please check ts file has no errors.');
		throw new Error("Cannot create Specs!!");
	}
}

function closeFileIfOpen(file) {
	const tabs = vscode.window.tabGroups.all.map(tg => tg.tabs).flat();
	const index = tabs.findIndex(tab => tab.input instanceof vscode.TabInputText && tab.input.uri.path === file.path);
	if (index !== -1) {
		vscode.window.tabGroups.close(tabs[index]);
	}
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

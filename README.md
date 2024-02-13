# Angular UTC Generator for Visual Studio Code
Welcome to the Angular UTC Generator extension for Visual Studio Code! This extension is designed to streamline the process of adding and updating UTC (Unit test Cases) in your Angular project, specifically for components, directives, pipes, and services files. Additionally, it offers the functionality to generate separate spec files for existing specs of components, directives, pipes, and services, ensuring that original spec files remain untouched.

Uses [ngentest](https://github.com/allenhwkim/ngentest) package internally.

## Features

- **UTC Annotation**: Easily add UTC annotations to your Angular components, directives, pipes, and services files with just a few clicks.
- **Spec File Generation**: Generate new spec files for existing components, directives, pipes, and services. Original spec files are preserved, allowing developers to manually compare and incorporate changes as needed.
- **Non-Destructive Operation**: The extension operates in a non-destructive manner, ensuring that existing code and spec files remain intact.
- **Visual Studio Code Integration**: Seamlessly integrates with Visual Studio Code, providing a user-friendly experience within your development environment.

## Getting Started

1. Install the Angular UTC Generator extension from the Visual Studio Code Marketplace.
2. Open your Angular project in Visual Studio Code.
3. Navigate to the file you want to update (component, directive, pipe, or service).
4. Use the provided commands in the context menu or command palette to generate spec files.

## Usage

Open any Typescript file and press Ctrl + Shift + P and select the command "Generate UTC for active file"

## Contributing

If you encounter any issues or have suggestions for improvements, feel free to [open an issue](https://github.com/k3t4ngit/ngen-utc-vscode/issues) on the GitHub repository. Contributions are also welcome through pull requests.

## License

This extension is licensed under the [MIT License](https://www.mit.edu/~amini/LICENSE.md).


Happy coding with Angular Spec Generator! 
#!/bin/bash

# Path: install.sh

# Root directory
cd ..

# Get version from package.json
version=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')

# Help
if [ "$1" = "--help" ] || [ "$1" = "-h" ] || [ "$1" = "/?" ]; then
  echo "Usage: ./install.sh [OPTION]"
  echo ""
  echo "Options:"
  echo "  --help, -h, /?   Show this help"
  echo ""
  echo "Examples:"
  echo "  ./install.sh"
  echo ""
  exit 0
fi

# Show intro
clear
intro=$(cat dev/intro.txt)
echo "$intro"
echo " "
echo " "

# Don't run if branch is main
if [ "$(git rev-parse --abbrev-ref HEAD)" = "main" ]; then
  echo "You are on main branch, aborting..."
  echo "Please checkout to a version branch and run this script again"
  echo "Run ./edit to checkout to version branch"
  exit 1
fi

# Don't run if is running on vscode internal terminal
if [ "$TERM_PROGRAM" = "vscode" ]; then
  echo "You are running this script on vscode internal terminal, aborting..."
  echo "Please run this script on a normal terminal"
  exit 1
fi



# Uninstall extension in Visual Studio Code
echo "Uninstalling extension in Visual Studio Code if it is installed..."
code --uninstall-extension hermannhahn.branch-protection > /dev/null 2>&1
sleep 5
# Install extension in Visual Studio Code
echo "Installing extension in Visual Studio Code..."
code --install-extension "dist/branch-protection-$version.vsix"
sleep 2

# Open extension in Visual Studio Code
echo "Opening extension in Visual Studio Code..."
code --extensionDevelopmentPath="$PWD" --extensionTestsPath="$PWD/test" > /dev/null 2>&1

# Done
echo "Successfully installed extension in Visual Studio Code!"

# Dev directory
cd dev

# Exit
exit 0

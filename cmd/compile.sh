#!/bin/bash

# Path: compile.sh

# Root directory
cd ..

# Get version from package.json
version=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
name=$(cat package.json | grep name | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')

# Help
if [ "$1" == "--help" ] || [ "$1" == "-h" ] || [ "$1" == "/?" ]; then
    echo "Usage: ./compile.sh [OPTION]"
    echo "Compiles the extension."
    echo ""
    echo "Options:"
    echo "  --help, --h, /?           Show this help message"
    echo ""
    echo "Example:"
    echo "  ./compile.sh"
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



# Remove old files
echo "Removing old files..."
rm -rf package-lock.json > /dev/null 2>&1
rm -rf out > /dev/null 2>&1
sleep 2

# Install dependencies if node_modules/ folder doesn't exist
echo "Installing dependencies..."
if [ ! -d node_modules/ ]; then
    npm install --silent > /dev/null 2>&1
    sleep 2
fi

# Compile extension
echo "Compiling extension..."
vsce package > /dev/null 2>&1
mv "$name-$version.vsix" dist/ > /dev/null 2>&1
sleep 2

# Save
echo "Saving..."
cd dev
./save.sh
cd ..

# Done
echo "Extension compiled successfully!"

# Dev directory
cd dev

# Exit
exit 0

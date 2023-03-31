#!/bin/bash

# Path: path.sh

# Root directory
cd ..

# Arguments
argument=$1

# Get version from package.json
pkg_version=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
pkg_name=$(cat package.json | grep name | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
version=$pkg_version
old_version=$pkg_version

# Help
if [ "$argument" = "--help" ] || [ "$argument" = "-h" ] || [ "$argument" = "/?" ]; then
  echo "Usage: ./path.sh [OPTION]"
  echo ""
  echo "Options:"
  echo "  --minor-upgrade  Increment minor of version and reset patch to 0"
  echo "  --major-upgrade  Increment major of version and reset minor and patch to 0"
  echo "  --help, -h, /?   Show this help"
  echo ""
  echo "Examples:"
  echo "  ./path.sh"
  echo "  ./path.sh --minor-upgrade"
  echo "  ./path.sh --major-upgrade"
  echo ""
  exit 0
fi

# Show intro
clear
intro=$(cat dev/intro.txt)
echo "$intro"
echo " "
echo " "
step "Deleting all branchs except main and $git_branch..." "git branch | grep -v 'main' | grep -v '$git_branch' | xargs git branch -D"

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



# If no arguments are passed
if [ -z "$argument" ]; then
  # Increment version
  version=$(echo "$pkg_version" | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
fi

# If is passed --minor-upgrade as argument, increment minor of version and reset patch to 0
if [ "$argument" = "--minor-upgrade" ]; then
    version=$(echo "$version" | awk -F. '{$(NF-1) = $(NF-1) + 1;} 1' | sed 's/ /./g')
    version=$(echo "$version" | awk -F. '{$NF = 0;} 1' | sed 's/ /./g')
fi
# If is passed --major-upgrade as argument, increment major of version and reset minor and patch to 0
if [ "$argument" = "--major-upgrade" ]; then
  version=$(echo "$version" | awk -F. '{$(NF-2) = $(NF-2) + 1;} 1' | sed 's/ /./g')
  version=$(echo "$version" | awk -F. '{$(NF-1) = 0;} 1' | sed 's/ /./g')
  version=$(echo "$version" | awk -F. '{$NF = 0;} 1' | sed 's/ /./g')
fi

# Info
echo "Package name: $pkg_name"
echo "Current version: $pkg_version"
echo "New version: $version"
echo ""
echo "Press ENTER to continue or CTRL+C to cancel"
read -t 5
echo ""

# Save branch
cd dev
./save.sh
cd ..

# Create branch to new version
echo "Creating new branch..."
git checkout -b "v$version" > /dev/null 2>&1
sleep 2
git push --set-upstream origin "v$version" > /dev/null 2>&1

# Check if version is different from package.json, if so update package.json
echo "Updating package.json..."
if [ "$version" != "$pkg_version" ]; then
    sed -i "s/\"version\": \"$pkg_version\"/\"version\": \"$version\"/g" package.json
    sleep 2
fi

# Check if version is different from CHANGELOG.md, if so update CHANGELOG.md
echo "Updating CHANGELOG.md..."
if ! grep -q "$version" CHANGELOG.md; then
    sed -i "s/## \[Unreleased\]/## \[Unreleased\] \r\n\r\n## \[$version\] - $(date +%Y-%m-%d)/g" CHANGELOG.md
    sleep 2
fi

# Check if version is different from README.md, if so update README.md
echo "Updating README.md..."
if ! grep -q "$version" README.md; then
    sed -i "s/## \[Unreleased\]/## \[Unreleased\] \r\n\r\n## \[$version\] - $(date +%Y-%m-%d)/g" README.md
    sleep 2
fi

# Save branch
cd dev
./save.sh
cd ..

# Delete old branch from local and remote
echo "Deleting old branch..."
git branch -D "$old_version" > /dev/null 2>&1
git push origin --delete "$old_version" > /dev/null 2>&1
sleep 2

# Patch done
echo "Package $pkg_name version $old_version updated to $version"
echo "Done!"

# Dev directory
cd dev

# Exit
exit 0

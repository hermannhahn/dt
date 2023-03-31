#!/bin/bash

# Path: publish.sh

# Import dev tools
source dt

# Variables
VSCE_TOKEN=$2

#####################################
# Publish to GitHub and Marketplace #
#####################################

step "Compiling extension..." "./compile.sh"
step "Saving branch $git_branch" "./save.sh"
step "Checkout to main branch..." "git checkout main"
step "Merging branch $git_branch to main..." "git merge $git_branch"
step "Saving branch $git_branch" "./save.sh"
step "Creating new tag..." "git tag $git_branch"
step "Pushing all changes to remote..." "git push && git push --tags"
step "Publishing new release on GitHub..." "gh release create $git_branch --title $git_branch --notes Release $git_branch dist/branch-protection-$git_branch.vsix"

# Publish extension in Visual Studio Marketplace if argument is --marketplace or -m
if [ "$2" == "--marketplace" ] || [ "$2" == "-m" ]; then
  step "Publishing to Visual Studio Marketplace..." "vsce publish -p $VSCE_TOKEN > /dev/null 2>&1"
fi

#!/bin/bash

# Path: edit.sh

##########################
# Edit git project       #
##########################

# Go to package folder
cd $pkg_folder

# Check if branch with same name of version package exists
if [ $(git branch | grep $pkg_version | wc -l) -eq 1 ]; then
    # Switch to branch
    step "Switching to branch $pkg_version" "git checkout $pkg_version"
else
    # Create branch
    step "Creating branch $pkg_version" "git checkout -b $pkg_version"
fi

# Open project in VS Code
step "Opening project in VS Code..." "code ."

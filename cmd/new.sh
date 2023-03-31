#!/bin/bash

# Path: save.sh

##########################
# Save changes to branch #
##########################

# Go to package folder
cd $pkg_folder

# Save branch name
step "Saving branch $git_branch" "git add ."
step "Waiting for sign..." "git commit -S -m 'v$pkg_version'"
step "Commit changes..."
step "Pushing..." "git push"
step "Pushing tags..." "git push --tags"
step "Branch $git_branch saved"

# Exit
exit 0

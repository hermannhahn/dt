#!/bin/bash

# Path: save.sh

##########################
# Save changes to branch #
##########################

# Go to package folder
cd $pkg_folder

# Check if the current branch has no upstream branch.
# If it has no upstream branch, create one.
function push {
    if [ -z "$(git rev-parse --abbrev-ref --symbolic-full-name @{u})" ]; then
        step "Pushing..." "git push --set-upstream origin $git_branch"
    else
        step "Pushing..." "git push"
    fi
}

# Save branch name
step "Saving branch $git_branch" "git add ."
step "Waiting for sign..." "git commit -S -m 'v$pkg_version'"
step "Commit changes..."
push
step "Pushing tags..." "git push --tags"
step "Branch $git_branch saved"

# Exit
exit 0

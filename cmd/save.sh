#!/bin/bash

# Path: save.sh

##########################
# Save changes to branch #
##########################

# Help
if [ "$2" = "--help" ] || [ "$2" = "-h" ] || [ "$2" = "/?" ]; then
    echo "Description: Save changes to branch"
    echo "Usage: dt save"
    echo ""
    echo "Example:"
    echo "  dt save"
    echo "  dt save --help"
    echo ""
    exit 0
fi


# Check if the current branch has no upstream branch.
# If it has no upstream branch, create one.
function push {
    if [ -z "$(git rev-parse --abbrev-ref --symbolic-full-name @{u})" ]; then
        step "Pushing" "git push --set-upstream origin $git_branch"
    else
        step "Pushing" "git push"
    fi
}

# Save branch name
step "Saving branch $git_branch" "git add ."
step "Waiting for signature password" "git commit -S -m 'v$pkg_version'"
step "Commit changes" "push"
step "Saving branch $git_branch..." "git push --tags"
step "Branch $git_branch saved"
step "Done!"

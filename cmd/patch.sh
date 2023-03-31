#!/bin/bash

# Path: patch.sh

# Arguments
argument=$2

# Help
if [ "$argument" = "--help" ] || [ "$argument" = "-h" ] || [ "$argument" = "/?" ]; then
  echo "Usage: dt patch [OPTION]"
  echo ""
  echo "Options:"
  echo "  --minor-upgrade  Increment minor of version and reset patch to 0"
  echo "  --major-upgrade  Increment major of version and reset minor and patch to 0"
  echo "  --help, -h, /?   Show this help"
  echo ""
  echo "Examples:"
  echo "  dt patch"
  echo "  dt patch --minor-upgrade"
  echo "  dt patch --major-upgrade"
  echo ""
  exit 0
fi

# If no arguments are passed
if [ -z "$argument" ]; then
  # Increment version
  step "Incrementing patch version..."
  version=$(echo "$pkg_version" | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
fi

# If is passed --minor-upgrade as argument
if [ "$argument" = "--minor-upgrade" ]; then
  # Increment minor of version and reset patch to 0
  step "Incrementing minor version..."
  version=$(echo "$version" | awk -F. '{$(NF-1) = $(NF-1) + 1;} 1' | sed 's/ /./g')
  version=$(echo "$version" | awk -F. '{$NF = 0;} 1' | sed 's/ /./g')
fi
# If is passed --major-upgrade as argument, increment major of version and reset minor and patch to 0
if [ "$argument" = "--major-upgrade" ]; then
  step "Incrementing major version..."
  version=$(echo "$version" | awk -F. '{$(NF-2) = $(NF-2) + 1;} 1' | sed 's/ /./g')
  version=$(echo "$version" | awk -F. '{$(NF-1) = 0;} 1' | sed 's/ /./g')
  version=$(echo "$version" | awk -F. '{$NF = 0;} 1' | sed 's/ /./g')
fi

# Info
echo "Package name: $pkg_name"
echo "Current version: $pkg_version"
echo "Patch version: $version"
echo ""
read -p "Press ENTER to continue or CTRL+C to cancel"
tput up && echo " " && tput up && echo " " && tput up && echo " " tput up && echo " " tput up && echo " " 
# Pull branch
# If has no changes, pull branch
if [ -z "$(git status --porcelain)" ]; then
  step "Pulling branch..." "git pull"
fi

# Create branch to new version
step "Creating new branch" "git checkout -b v$version"
sleep 2
step "Configuring new branch" "git push --set-upstream origin v$version"

# Update package.json
step "Updating package.json" 'sed -i "s/\"version\": \"$pkg_version\"/\"version\": \"$version\"/g" package.json'
sleep 2

# Update CHANGELOG.md
step "Updating CHANGELOG.md" 'sed -i "s/## \[Unreleased\]/## \[Unreleased\] \r\n\r\n## \[$version\] - $(date +%Y-%m-%d)/g" CHANGELOG.md'
sleep 2

# Update README.md
step "Updating README.md" 'sed -i "s/## \[Unreleased\]/## \[Unreleased\] \r\n\r\n## \[$version\] - $(date +%Y-%m-%d)/g" README.md'
sleep 2

# Save branch
step "Saving new patch"
./bin/save.sh


# Delete old branchs
step "Deleting old branchs" 
read -p "Do you want to delete all branchs except this one and main? (y/N)"
if [ "$REPLY" = "y" || "$REPLY" = "Y" ]; then
  # Delete all branchs except main and $version branchs
  branches=$(git branch --list | grep -v -e "main" -e "master" -e v$version)
  if [ -z "$branches" ]; then
    step "No branchs to delete"
  else
    for branch in $branches
    do
      git branch -D $branch
    done
  fi
fi

# Patch done
step "Patch version $version from $old_version successfully created!"
step "Done!"

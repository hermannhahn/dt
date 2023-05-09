# Get version from package.json
VERSION=$(node -p -e "require('./package.json').version")

# Get GitHub user and repo from package.json
GITHUB_USER=$(node -p -e "require('./package.json').repository.url.split('/')[3]")
GITHUB_REPO=$(node -p -e "require('./package.json').repository.url.split('/')[4]")
# Remove .git from the end of the repo
GITHUB_REPO=${GITHUB_REPO%.git}

# Create a new release on GitHub
gh release create \
  $VERSION \
  --title $VERSION \
  --repo $GITHUB_USER/$GITHUB_REPO \
  -F CHANGELOG.md \
  release/*.zip

# Get version from package.json
VERSION=$(node -p -e "require('./package.json').version")

# Get GitHub user and repo from package.json
GITHUB_USER=$(node -p -e "require('./package.json').repository.url.split('/')[3]")
GITHUB_REPO=$(node -p -e "require('./package.json').repository.url.split('/')[4]")

# Create a new release on GitHub
gh release create \
  --repo $GITHUB_REPO \
  --tag $VERSION \
  --name "Release $VERSION" \
  --description "Release $VERSION"
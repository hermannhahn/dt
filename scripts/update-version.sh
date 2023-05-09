#!/bin/bash

# Get version from package.json
VERSION=$(cat ../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
sed -i "s/version = \".*\"/version = \"${VERSION}\"/g" ../src/modules/cli/version.ts

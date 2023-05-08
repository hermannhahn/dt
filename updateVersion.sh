CURRENT_VERSION=$(cat src/dt.ts | grep version | cut -d '"' -f 4)
NEW_VERSION=$(cat package.json | grep version | cut -d '"' -f 4)

if [ "$CURRENT_VERSION" != "$NEW_VERSION" ]; then
    echo "Atualizando versão de $CURRENT_VERSION para $NEW_VERSION"
    # substituir a versão no arquivo dt.js
    sed -i "s/${CURRENT_VERSION}/${NEW_VERSION}/" src/dt.ts
    exit 0
fi

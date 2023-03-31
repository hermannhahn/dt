function update_check {
  # Check for updates
  RELEASE_VERSION=$(curl -s https://api.github.com/repos/hermannhahn/dt/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")')
  # Get local version from package.json
  LOCAL_VERSION=$(cat $DT_DIR/package.json | grep -oP '"version": "\K(.*)(?=")')
  # Compare versions
  if [ "$RELEASE_VERSION" != "$LOCAL_VERSION" ]; then
  # Add green tip
    echo -e "\e[32mUpdate available!\e[0m Run \e[32mdt update\e[0m to update."
fi
update_check

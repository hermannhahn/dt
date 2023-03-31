function update_check {
  # Check for updates
  MAIN_VERSION=$(curl -s https://raw.githubusercontent.com/hermannhahn/dt/main/package.json | grep -oP '"version": "\K(.*)(?=")')
  # Get local version from package.json
  LOCAL_VERSION=$(cat $DT_DIR/package.json | grep -oP '"version": "\K(.*)(?=")')
  # Compare versions
  if [ "$RELEASE_VERSION" != "$LOCAL_VERSION" ]; then
  # Add green tip
    echo -e "\e[32mUpdate available!\e[0m Run \e[32mdt update\e[0m to update."
fi
update_check

BIN_DIR=$(dirname "$0")
DT_DIR=$(dirname "$BIN_DIR")
INSTALL_DIR=%APPDATA%\Local\Programs\dt
CALLER_DIR=$PWD
source $DT_DIR/libs/help.sh
source $DT_DIR/libs/intro.sh
source $DT_DIR/libs/git_rules.sh
source $DT_DIR/libs/git.sh
source $DT_DIR/libs/pkg_rules.sh
source $DT_DIR/libs/package.sh
source $DT_DIR/libs/progress_bar.sh
source $DT_DIR/libs/step.sh
cd $CALLER_DIR
step "Checking for updates..." "sleep 2"
# Check for updates
# Get version from github
# Compare version with local version
# If version is newer, download and install
# If version is older, exit
# If version is the same, exit
RELEASE_VERSION=$(curl -s https://api.github.com/repos/hermannhahn/dt/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")')
# Get local version from package.json
LOCAL_VERSION=$(cat $DT_DIR/package.json | grep -oP '"version": "\K(.*)(?=")')
# Compare versions
if [ "$RELEASE_VERSION" != "$LOCAL_VERSION" ]; then
    step "Update available!" "sleep 2"
    step "Updating..." "sleep 2"
    # Create temp folder
    step "Downloading updates..." "mkdir -p $DT_DIR/tmp"
    # Download git repository as zip
    step "Downloading updates..." "curl -L https://github.com/hermannhahn/dt/archive/refs/heads/main.zip -o $DT_DIR/updates.zip"
    # Unzip git repository to temp folder
    step "Installing updates..." "unzip $DT_DIR/updates.zip -d $DT_DIR/tmp"
    # Copy files from temp folder to dt folder
    step "Copying files..." "cp -r $DT_DIR/tmp/dt-main/* $DT_DIR"
    # Remove temp folder
    step "Cleaning up temporary files..." "rm -rf $DT_DIR/tmp"
    # Remove zip file
    step "Cleaning up temporary files..." "rm -rf $DT_DIR/updates.zip"
    step "Update complete!"
    # Done
    step "Done!"
else
    step "Nothing to update!"
    step "Done!"
fi

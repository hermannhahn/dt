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
step "Starting installer..." "sleep 2"
step "Installing to $INSTALL_DIR..."
step "Copying files..." "mkdir -p $INSTALL_DIR"
step "Copying files..." "cp -r $DT_DIR/* $INSTALL_DIR"
# Add dt to PATH
step "Adding dt to PATH..." "PATH=$INSTALL_DIR/bin" 
step "Installation complete!"
step "Done!"
./update.sh

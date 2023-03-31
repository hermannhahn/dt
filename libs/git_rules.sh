####################
#    Git Rules     #
####################

cd $CALLER_DIR

# Don't run if caller_folder is not a git repository
if [ -z "$(git status)" ]; then
  echo "If you want create a new repository in this folder run /new"
  exit 1
fi

# Don't run if branch is main
if [[ "$(git rev-parse --abbrev-ref HEAD)" = "main" && $BIN_FILE != "new" &&  $BIN_FILE != "edit" ]]; then
  echo "You are on main branch, aborting..."
  echo "Please checkout to a version branch and run this script again"
  echo "Run /edit to checkout to version branch"
  exit 1
fi

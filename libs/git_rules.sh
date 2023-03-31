####################
#    Git Rules     #
####################

# Don't run if caller_folder is not a git repository
if [ -z "$(git status)" ]; then
  echo "You're are not in a project folder. \e[0m run \e[32mdt new\e[0m"
  exit 1
fi

# Don't run if branch is main
if [[ "$(git rev-parse --abbrev-ref HEAD)" = "main" && $BIN_FILE != "new" &&  $BIN_FILE != "edit" &&  $BIN_FILE != "patch" ]]; then
  echo "You are on main branch, aborting..."
  echo "Please checkout to a version branch and run this script again"
  echo "\e[0mRun \e[32mdt edit\e[0m to checkout to version branch"
  exit 1
fi

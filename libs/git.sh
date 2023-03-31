####################
#       Git        #
####################

cd $CALLER_DIR

git_branch=$(git rev-parse --abbrev-ref HEAD)
git_folder=$(git rev-parse --show-toplevel)


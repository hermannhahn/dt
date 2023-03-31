####################
#      Package     #
####################

# Don't run if package.json is not found
if [ ! -f "package.json" ]; then
  echo "package.json not found, aborting..."
  echo "Go to the package folder and run this script again"
  echo "Please create a package.json file and run this script again"
  echo "Run /new to create a new package.json file"
  exit 1
fi

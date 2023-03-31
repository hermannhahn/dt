####################
#      Help        #
####################

function help {
  local help=$(cat $DT_DIR/txt/$BIN_FILE-help.txt)
  if [ -n "$help" ]; then
      printf "$help"
  else
      echo "No help found for $BIN_FILE"
  fi
  exit 0
}

if [ "$1" == "--help" ] || [ "$1" == "-h" ] || [ "$1" == "/?" ]; then
  help
fi


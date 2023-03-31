####################
#      Intro       #
####################

function terminal_intro {
  local terminal_intro=$(cat $DT_DIR/txt/intro.txt)
  clear
  echo "$terminal_intro"
  echo " "
}
terminal_intro

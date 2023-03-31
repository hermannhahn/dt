####################
# Progress bar     #
####################

# Set progress bar variables
progress_bar=0
progress_bar_size=75
progress_bar_steps=$(cat $DT_DIR/cmd/$1.sh | grep -o "step" | wc -l)
progress_bar_increment=$((100 / progress_bar_steps))
terminal_command_line=10

# Progress bar
function progress_bar {
  # Print progress bar
  printf "\r["
  for ((i=0; i<$progress_bar_size; i++)); do
    if [ $i -lt $((progress_bar_size * progress_bar / 100)) ]; then
      printf "\e[48;5;3m \e[0m"
    else
      printf " "
    fi
  done
  printf "] $progress_bar%%"
}

# Update progress bar
function update_progress {
  # If progress bar is 0, init progress bar
  if [ $progress_bar -eq 0 ]; then
    progress_bar=$((progress_bar + progress_bar_increment))
  fi
  # Increment progress bar
  # If $1 is set, set progress bar to $1
  if [ -n "$1" ]; then
    progress_bar=$1
  else
    progress_bar=$((progress_bar + progress_bar_increment))
  fi
  # If progress bar is greater than 100, set it to 100
  if [ $progress_bar -gt 100 ]; then
    progress_bar=100
  fi
  printf "\n "
  tput cup 8 7
  progress_bar
  sleep 0.01
}

# Step
function step {
  # Update progress bar
  update_progress
  # If $1 is "Done!", set progress bar to 100
  if [ "$1" = "Done!" ]; then
    update_progress 100
  fi
  # Print echo message
  tput cup $terminal_command_line 0
  tput el
  printf "$1\r"
  # Clear line
  # Run command
  eval "$2" > /dev/null 2>&1
  sleep 2
}

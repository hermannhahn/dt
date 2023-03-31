terminal_command_line=10

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

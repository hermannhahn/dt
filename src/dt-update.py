import os
import platform
import urllib.request

# Set the URL of the update file
if platform.system() == "Windows":
    url = "https://github.com/hermannhahn/dt/releases/download/latest/dt-win.exe"
    filename = "dt.exe"
elif platform.system() == "Darwin":
    url = "https://github.com/hermannhahn/dt/releases/download/latest/dt-macos"
    filename = "dt"
elif platform.system() == "Linux":
    url = "https://github.com/hermannhahn/dt/releases/download/latest/dt-linux"
    filename = "dt"

# Download the update file
urllib.request.urlretrieve(url, filename)

# Set the name of the update file
update_file_name = "dt.exe" if platform.system() == "Windows" else "dt"

# Replace the old file with the new one
os.replace(update_file_name, filename)

print("Atualização concluída com sucesso!")

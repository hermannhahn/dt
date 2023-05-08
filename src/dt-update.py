import os
import platform
import urllib.request

# Set the URL of the update file
versionUrl = "https://raw.githubusercontent.com/hermannhahn/dt/main/version.txt"
if platform.system() == "Windows":
    url = "https://github.com/hermannhahn/dt/releases/download/latest/dt-win.exe"
    filename = "dt-win.exe"
elif platform.system() == "Darwin":
    url = "https://github.com/hermannhahn/dt/releases/download/latest/dt-macos"
    filename = "dt-macos"
elif platform.system() == "Linux":
    url = "https://github.com/hermannhahn/dt/releases/download/latest/dt-linux"
    filename = "dt-linux"

# Download the update file
urllib.request.urlretrieve(url, filename)
urllib.request.urlretrieve(versionUrl, "version.txt")

# Set the name of the update file
update_file_name = "dt.exe" if platform.system() == "Windows" else "dt"

# Replace the old file with the new one
os.replace(filename, update_file_name)

print("Atualização concluída com sucesso!")

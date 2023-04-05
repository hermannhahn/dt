@echo off

set "batch_dir=%~dp0"
cd /d "%batch_dir%"
cd ..
set "batch_dir=%CD%"
cd /d "%~dp0"
cd %pwd%
node "%batch_dir%\build\dt.js" %*

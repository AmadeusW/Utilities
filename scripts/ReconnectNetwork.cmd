@echo off

REM This script ensures that \\server\folder is mapped as M drive and available
REM Place it in %appdata%\Microsoft\Windows\Start Menu\Programs\Startup
REM Without this script, I would have to open M drive manually in explorer before it's available to other apps

:Start
timeout /t 5 /nobreak >NUL
if exist M:\ NUL goto End
net use M: \\server\folder /PERSISTENT:YES
if ERRORLEVEL 1 goto exit
:End

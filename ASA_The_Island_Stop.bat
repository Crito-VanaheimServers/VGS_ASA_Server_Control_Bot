@echo off
COLOR 0c
SETLOCAL EnableExtensions enabledelayedexpansion

::Change to name of your servers exe file.
::If you are using a name other than the default name this will not work I would suggest going and putting _ for spaces in your exe name
set ServerEXE=ArkAscendedServer.exe

::This should be set to the name of the start .bat file used to start the server
set ServerMonitor=ASA_The_Island_Start.bat

::This should match the title of the monitor. Title of monitor is set in the start bat file where word TITLE is followed by a name.
set MonitorTitle=ASA The Island Server Monitor

::not very important just visual display of name on monitor set to whatever you want
set GameName=ASA The Island

::set your password you use to log in as admin in game here for rcon to work with the bot
set adminPassword=Charlie2012

::The next 2 settings should not need to be changed but if you need to they are here.
::The bot should run on same machine as server for everything to work correctly.
::Set your ports IP (default 127.0.0.1)
set serverIP=127.0.0.1

::set your servers rcon port
set rconPort=27020

::DONT TOUCH ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING OR YOU WILL BREAK THINGS!!
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
goto CheckServerRunning

:CheckServerRunning
echo Checking if %GameName% server is running
echo.
FOR /F %%x IN ('tasklist /NH /FI "IMAGENAME eq %ServerEXE%"') DO IF %%x == %ServerEXE% goto ServerFound
goto CheckMonitorRunning

:ServerFound
FOR /F %%x IN ('tasklist /NH /FI "IMAGENAME eq %ServerEXE%"') DO IF %%x == %ServerEXE% goto KillGameServer

:KillGameServer
timeout 1 >nul
"%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "saveworld"
echo.
goto CheckMonitorRunning

:CheckMonitorRunning
echo Checking if %GameName% server monitor is running
echo.
FOR /F %%x IN ('tasklist /NH /FI "IMAGENAME eq %ServerMonitor%"') DO IF %%x == %ServerMonitor% goto MonitorFound

:MonitorFound
FOR /F %%x IN ('tasklist /NH /FI "IMAGENAME eq %ServerMonitor%"') DO IF %%x == %ServerMonitor% goto KillMonitor

:KillMonitor
timeout 10 >nul
"%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "DoExit"
Taskkill /F /FI "WINDOWTITLE eq %MonitorTitle%" /T
echo.
timeout 3 >nul

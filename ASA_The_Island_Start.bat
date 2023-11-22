@echo off
call %~dp0ASA_The_Island_Stop.bat
timeout 5 > NUL
COLOR 0a
SETLOCAL EnableExtensions enabledelayedexpansion

::Change the title for you monitor window with quotes
TITLE ASA The Island Server Monitor

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::Caution Do Not put spaces after the = on any of the set variables!!!	::
::Example of what not to do >>>>>>>>> CommandLine = TheIsland_WP		::
::Example of correct way to do it >>> CommandLine=TheIsland_WP			::
::Doing this wrong will cause error when starting server				::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::not very important just visual display of name on monitor set to whatever you want
set GameName=ASA The Island

::Change this to the hour you want server to restart. military (12=12pm 00=12am) https://www.ontheclock.com/convert-military-24-hour-time.aspx
set restartHour=00

::Change to name of your servers exe file.
::If you are using a name other than the default name this will not work I would suggest going and putting _ for spaces in your exe name
set ServerEXE=ArkAscendedServer.exe

::Set file path to the folder your server files are located or will be located.
::If your folder names have spaces this will not work I would suggest going and putting _ for spaces in folder names.
set GameserverPath=C:\VGS_Server_Files\ARK_Survival_Ascended\The_Island

::Set file path to the folder your steam cmd files are located
::If your folder names have spaces this will not work I would suggest going and putting _ for spaces in folder names.
set STEAMPATH=C:\VGS_Server_Files\Steam_CMD_Files

::Set the start up command line for your ark server. If you use quotes in your command line this may not work.
set CommandLine=TheIsland_WP?RCONEnabled=True?RCONPort=27020?listen?QueryPort=27015?SessionName="VGS Island PVE Boosted"?MaxPlayers=70?ServerAdminPassword=Charlie2012 -NoBattlEye -automanagedmods -Mods=928708,930404,928677,928621,929420,930128,931372,931877,928597,929543,929038,936887,928818 -crossplay -webalarm -nosteamclient -game -server -log 

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
set /A restartCounter=0

goto ServerUpdate

:ServerUpdate
set STEAMLOGIN=anonymous
set GameServerBRANCH=2430930

echo.
echo     You are about to update your %GameName% server
echo        Dir: %GameserverPath%
echo        Branch: %GameServerBRANCH%
echo.
timeout 5 > NUL
%STEAMPATH%\steamcmd.exe +force_install_dir %GameserverPath%  +login %STEAMLOGIN% +"app_update %GameServerBRANCH%" validate +quit
timeout 5 > NUL
echo.
echo     Your %GameName% server is now up to date
timeout 5 > NUL

goto StartServer

:StartServer
start /min %GameserverPath%\ShooterGame\Binaries\Win64\%ServerEXE% %CommandLine%

echo.
echo %GameName% server was started at %time% 
echo %GameName% server will auto restart at %restartHour%:00:00
echo %GameName% server total restarts %restartCounter%
set /a calWH=%restartHour%-1
set warningHour=0%calWH%
if %restartHour% EQU 00 set warningHour=23
timeout 5 >nul
powershell -window minimized -command ""
timeout 90 >nul
node src/register-commands.js
node src/index.js
goto CheckServerRunning

:CheckServerRunning
FOR /F %%x IN ('tasklist /NH /FI "IMAGENAME eq %ServerEXE%"') DO IF %%x == %ServerEXE% goto ServerFound
goto ServerNotFound

:ServerFound
timeout 5 >nul
goto TimeCheck

:TimeCheck
for /F "tokens=1-3 delims=:." %%a in ("%time%") do (
   set timeHour=%%a
   set timeMinute=%%b
   set timeSeconds=%%c
)
set /A newTime=timeHour*60 + timeMinute
set /A timeHour=newTime/60, timeMinute=newTime%%60
if %timeHour% gtr 23 set timeHour=0
if %timeHour% lss 10 set timeHour=0%timeHour%
if %timeMinute% lss 10 set timeMinute=0%timeMinute%

if %timeHour% EQU %warningHour% if %timeMinute% EQU 30 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 30 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 45 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 15 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 50 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 10 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 55 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 5 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 56 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 4 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 57 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 3 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 58 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 2 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 59 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 1 MINUTE (Saving World)****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 59 if %timeSeconds% gtr 20 if %timeSeconds% lss 25 "%~dp0rcon/mcrcon.exe" -H 127.0.0.1 -P 27020 -p Charlie2012 "saveworld"

if %timeHour% EQU %restartHour% if %timeMinute% lss 01 if %timeSeconds% lss 20 goto ExecuteRestart
goto CheckServerRunning

:ExecuteRestart
"%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "DoExit"
goto CheckServerRunning

:ServerNotFound
echo %GameName% server not found
set /A restartCounter+=1
echo Please wait while the %GameName% server is restarted.
timeout 20 >nul
goto ServerUpdate

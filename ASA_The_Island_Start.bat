@echo off
Taskkill /F /FI "WINDOWTITLE eq ASA The Island Server Monitor" /T
Taskkill /F /FI "WINDOWTITLE eq ASA Island Server Controller Bot" /T
timeout 1 > NUL
start /min %~dp0src/ASAIsland_Server_Controller_Start.bat
COLOR 0a

TITLE ASA The Island Server Monitor
SETLOCAL EnableExtensions enabledelayedexpansion

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::Caution Do Not put spaces after the = on any of the set variables!!!	::
::Example of what not to do >>>>>>>>> CommandLine = TheIsland_WP		::
::Example of correct way to do it >>> CommandLine=TheIsland_WP			::
::Doing this wrong will cause error when starting server				::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::Change this to the hour you want server to restart. military (12=12pm 00=12am) https://www.ontheclock.com/convert-military-24-hour-time.aspx
set restartHour=00

::Set file path to the folder your server files are located or will be located.
::If your folder names have spaces this will not work I would suggest going and putting _ for spaces in folder names.
set GameserverPath=C:\VGS_Server_Files\ARK_Survival_Ascended\The_Island

::Set file path to the folder your steam cmd files are located
::If your folder names have spaces this will not work I would suggest going and putting _ for spaces in folder names.
set STEAMPATH=C:\VGS_Server_Files\Steam_CMD_Files

::Set the start up command line for your ark server. If you use quotes in your command line this may not work.
set CommandLine=TheIsland_WP?listen?Port=7777?QueryPort=27015?RCONPort=27020?RCONEnabled=True?SessionName="Island"?MaxPlayers=70?ServerAdminPassword=YourPasswordHere -NoBattlEye -automanagedmods -Mods=928708,930404,928621,929420,930128,933099,931877,929543,929038,928818,929713 -crossplay -webalarm -servergamelog -game -server -log 

::set your password you use to log in as admin in game here for rcon to work with the bot
set adminPassword=YourPasswordHere

::The next 2 settings should not need to be changed but if you need to they are here.
::The bot should run on same machine as server for everything to work correctly.
::Set your ports IP (default 127.0.0.1)
set serverIP=127.0.0.1

::set your servers rcon port
set rconPort=27020

::DONT TOUCH ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING OR YOU WILL BREAK THINGS!!
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
set ServerEXE=ArkAscendedServer.exe
set GameServerBRANCH=2430930
set GameName=ASA The Island
set /A restartCounter=0

set /a calWH=%restartHour%-1
set warningHour=0%calWH%
if %restartHour% EQU 00 set warningHour=23
goto SafetyCheck

:SafetyCheck
@cls
echo Checking if %GameName% server is running
echo.
FOR /F %%x IN ('tasklist /NH /FI "IMAGENAME eq %ServerEXE%"') DO IF %%x == %ServerEXE% goto ServerRunning
echo %GameName% server not found, going to check for updates before server start.
echo.
goto ServerUpdate

:ServerRunning
set currHour=%TIME:~0,2%
IF "%currHour:~0,1%" == " " set currHour=0%currHour:~1,1%
set currMinute=%TIME:~3,2%
set currSeconds=%TIME:~6,2%
echo.
echo %GameName% server is already running, current time is %currHour%:%currMinute%:%currSeconds%
echo %GameName% server will auto restart at %restartHour%:00:00
echo %GameName% server total restarts since this monitor has been running %restartCounter%
timeout 5 >nul
powershell -window minimized -command ""
goto CheckServerRunning

:ServerUpdate
cls
set STEAMLOGIN=anonymous

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
set startHour=%TIME:~0,2%
IF "%startHour:~0,1%" == " " set startHour=0%startHour:~1,1%
set startMinute=%TIME:~3,2%
set startSeconds=%TIME:~6,2%
echo.
echo %GameName% server was started at %startHour%:%startMinute%:%startSeconds%
echo %GameName% server will auto restart at %restartHour%:00:00
echo %GameName% server total restarts since this monitor has been running %restartCounter%
timeout 5 >nul
powershell -window minimized -command ""
goto CheckServerRunning

:CheckServerRunning
FOR /F %%x IN ('tasklist /NH /FI "IMAGENAME eq %ServerEXE%"') DO IF %%x == %ServerEXE% goto ServerFound
goto ServerNotFound

:ServerFound
timeout 5 >nul
goto TimeCheck

:TimeCheck
set timeHour=%TIME:~0,2%
IF "%timeHour:~0,1%" == " " set timeHour=0%timeHour:~1,1%

set timeMinute=%TIME:~3,2%

set timeSeconds=%TIME:~6,2%

if %timeHour% EQU %warningHour% if %timeMinute% EQU 30 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 30 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 45 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 15 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 50 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 10 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 55 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 5 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 56 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 4 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 57 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 3 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 58 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 2 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 59 if %timeSeconds% lss 20 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 1 MINUTE (Saving World)****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 59 if %timeSeconds% gtr 20 if %timeSeconds% lss 25 "%~dp0rcon/mcrcon.exe" -H 127.0.0.1 -P 27020 -p %adminPassword% "saveworld"

if %timeHour% EQU %restartHour% if %timeMinute% EQU 00 if %timeSeconds% lss 20 goto ExecuteRestart
	
goto CheckServerRunning

:ExecuteRestart
timeout 1 >nul
"%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "DoExit"
timeout 1 >nul
set /A restartCounter+=1
echo Please wait while the %GameName% server is restarted.
timeout 20 >nul
goto ServerUpdate

:ServerNotFound
echo %GameName% server not found
echo.
set /A restartCounter+=1
echo Please wait while the %GameName% server is restarted.
timeout 20 >nul
goto ServerUpdate

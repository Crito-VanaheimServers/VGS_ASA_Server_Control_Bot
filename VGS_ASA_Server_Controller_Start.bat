::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::Caution Do Not put spaces after the = on any of the set variables!!!	::
::Example of what not to do >>>>>>>>> CommandLine = TheIsland_WP		::
::Example of correct way to do it >>> CommandLine=TheIsland_WP			::
::Doing this wrong will cause error when starting server				::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::your bots token from bot you create at https://discord.com/developers/
set "botToken=jdaflkjasdflkjioeur98u78348591q87y34t98ryhuiq3e4yhutr98q3yut89f"

::your discord server ID where your bot will be listening
set "discordServerID=4615614654685465165"

::your discord bots ID
set "discordBotID=514561651564684651515646"

::discord channel ID where your commands will only work from, so normal players cannot mess with your server
set "adminChanelID=15616146545684865456156"

::discord channel ID were in game chat is to be sent to
set "chatChannelID=21651654685423156415648695"

::max number of players that can join your server.
::Used in bots status showing number of players on vs number of slots available
set "serverSlots=70"

::Name of your server that players see when they search for it
set "serverName=VGS ISLAND PVE BOOSTED"

::name of server all lowercase and no spaces. 
::IMPORTANT: do not use spaces or capital letters in name, use underscore in place of spaces.
::Used in creating slash command for this server
::EXAMPLE: vgs_island_pve_boosted
set "mapSlashCommands=vgs_island_pve_boosted"

::Change this to the hour you want server to restart. military (12=12pm 00=12am) https://www.ontheclock.com/convert-military-24-hour-time.aspx
set "restartHour=00"

::If your using Server API then set this to AsaApiLoader.exe
::If you have no idea or you are NOT using Server API than set to ArkAscendedServer.exe
::info about server API found here https://gameservershub.com/forums/resources/categories/asa-official-resources.111/
set "EXELauncher=ArkAscendedServer.exe"

::Set file path to the folder your server files are located or will be located.
set "GameserverPath=C:\VGS_Server_Files\ARK_Survival_Ascended\The_Island"

::Set file path to the folder your steam cmd files are located
set "STEAMPATH=C:\VGS_Server_Files\Steam_CMD_Files"

::Set the start up command line for your ark server.
set "CommandLine=TheIsland_WP?listen?Port=7777?MaxPlayers=70? -NoBattlEye -crossplay -servergamelog -game -server -log"

::set your password you use to log in as admin in game here for rcon to work with the bot
set "adminPassword=YourPasswordHere"

::The next 2 settings should not need to be changed but if you need to they are here.
::The bot should run on same machine as server for everything to work correctly.
::Set your ports IP (default 127.0.0.1)
set "serverIP=127.0.0.1"

::set your servers rcon port
set "rconPort=27020"


:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::DONT TOUCH ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING OR YOU WILL BREAK THINGS!!
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
@echo off
Taskkill /F /FI "WINDOWTITLE eq ASA %serverName% Server Monitor"
Taskkill /F /FI "WINDOWTITLE eq ASA %serverName% Server Controller Bot" /T

timeout 1 > NUL
set NLM=^



set NL=^^^%NLM%%NLM%^%NLM%%NLM%


echo TOKEN = %botToken%%NL%DiscordServer_ID = %discordServerID%%NL%Bot_ID = %discordBotID%%NL%Admin_Channel_ID = %adminChanelID%%NL%Chat_Channel_ID = %chatChannelID%%NL%Bot_Folder_Path = %~dp0%NL%ServerSlots = %serverSlots%%NL%Map_name = %mapSlashCommands%%NL%Message_Tittle = %serverName%%NL%ASA_ServerIP = %serverIP%%NL%ASA_rcon_port = %rconPort%%NL%ASA_password = %adminPassword%>%~dp0.env
for /f "usebackq tokens=* delims=" %%a in ("%~dp0.env") do (echo(%%a)>>~.env
move /y  ~.env "%~dp0.env"
timeout 1 > NUL

start /min %~dp0src/VGS_ASA_Bot_Start.bat "%serverName%"
COLOR 0a

SETLOCAL EnableExtensions enabledelayedexpansion

set GameServerBRANCH=2430930
set /A restartCounter=0
TITLE ASA %serverName% Server Monitor

set "workdir=%GameserverPath%\ShooterGame\Binaries\Win64\
set "workdir=%workdir:\=\\%"

set /a calWH=%restartHour%-1
set warningHour=0%calWH%
if %restartHour% EQU 00 set warningHour=23
goto SafetyCheck

:SafetyCheck
@cls
echo Checking if %serverName% server is running
echo.
for /f "usebackq tokens=* delims=" %%a in (`
    wmic process  where 'CommandLine like "%%!workdir!%%" and not CommandLine like "%%RuntimeBroker%%"'   get CommandLine^,ProcessId  /format:value
`) do (
    for /f "tokens=* delims=" %%G in ("%%a")  do (
        if "%%G" neq "" (
            set "%%G"
            goto ServerRunning
        )
    )
) 
echo %serverName% server not found, going to check for updates before server start.
echo.
goto ServerUpdate

:ServerRunning
set currHour=%TIME:~0,2%
IF "%currHour:~0,1%" == " " set currHour=0%currHour:~1,1%
set currMinute=%TIME:~3,2%
set currSeconds=%TIME:~6,2%
echo.
echo %serverName% server is already running, current time is %currHour%:%currMinute%:%currSeconds%
echo %serverName% server will auto restart at %restartHour%:00:00
echo %serverName% server total restarts since this monitor has been running %restartCounter%
echo.
echo Closing this window will stop monitoring of the server
echo If this is not monitoring the server than there will not be a daily restart or auto restart on a crash

timeout 5 >nul
powershell -window minimized -command ""
goto CheckServerRunning

:ServerUpdate
cls
set STEAMLOGIN=anonymous

echo.
echo     You are about to update your %serverName% server
echo        Dir: %GameserverPath%
echo        Branch: %GameServerBRANCH%
echo.
timeout 5 > NUL
%STEAMPATH%\steamcmd.exe +force_install_dir %GameserverPath%  +login %STEAMLOGIN% +"app_update %GameServerBRANCH%" validate +quit
timeout 5 > NUL
echo.
echo     Your %serverName% server is now up to date
timeout 5 > NUL

goto StartServer

:StartServer
start /min %GameserverPath%\ShooterGame\Binaries\Win64\%EXELauncher% %CommandLine%
set startHour=%TIME:~0,2%
IF "%startHour:~0,1%" == " " set startHour=0%startHour:~1,1%
set startMinute=%TIME:~3,2%
set startSeconds=%TIME:~6,2%
echo.
echo %serverName% server was started at %startHour%:%startMinute%:%startSeconds%
echo %serverName% server will auto restart at %restartHour%:00:00
echo %serverName% server total restarts since this monitor has been running %restartCounter%
echo.
echo Closing this window will stop monitoring of the server
echo If this is not monitoring the server than there will not be a daily restart or auto restart on a crash

timeout 5 >nul
powershell -window minimized -command ""
goto CheckServerRunning

:CheckServerRunning
for /f "usebackq tokens=* delims=" %%a in (`
    wmic process  where 'CommandLine like "%%!workdir!%%" and not CommandLine like "%%RuntimeBroker%%"'   get CommandLine^,ProcessId  /format:value
`) do (
    for /f "tokens=* delims=" %%G in ("%%a")  do (
        if "%%G" neq "" (
            set "%%G"
            goto ServerFound
        )
    )
) 
goto ServerNotFound


:ServerFound
timeout 5 >nul
goto TimeCheck

:TimeCheck
set timeHour=%TIME:~0,2%
IF "%timeHour:~0,1%" == " " set timeHour=0%timeHour:~1,1%

set timeMinute=%TIME:~3,2%

set timeSeconds=%TIME:~6,2%

if %timeHour% EQU %warningHour% if %timeMinute% EQU 30 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 30 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 30 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "Broadcast ****SERVER RESTART 30 MINUTES****"

if %timeHour% EQU %warningHour% if %timeMinute% EQU 45 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 15 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 45 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "Broadcast ****SERVER RESTART 15 MINUTES****"

if %timeHour% EQU %warningHour% if %timeMinute% EQU 50 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 10 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 50 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "Broadcast ****SERVER RESTART 10 MINUTES****"

if %timeHour% EQU %warningHour% if %timeMinute% EQU 55 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 5 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 55 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "Broadcast ****SERVER RESTART 5 MINUTES****"

if %timeHour% EQU %warningHour% if %timeMinute% EQU 56 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 4 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 56 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "Broadcast ****SERVER RESTART 4 MINUTES****"

if %timeHour% EQU %warningHour% if %timeMinute% EQU 57 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 3 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 57 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "Broadcast ****SERVER RESTART 3 MINUTES****"

if %timeHour% EQU %warningHour% if %timeMinute% EQU 58 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 2 MINUTES****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 58 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "Broadcast ****SERVER RESTART 2 MINUTES****"

if %timeHour% EQU %warningHour% if %timeMinute% EQU 59 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "ServerChat ****SERVER RESTART 1 MINUTE (Saving World)****"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 59 if %timeSeconds% lss 5 "%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "Broadcast ****SERVER RESTART 1 MINUTE (Saving World)****"

if %timeHour% EQU %warningHour% if %timeMinute% EQU 59 if %timeSeconds% gtr 5 if %timeSeconds% lss 25 "%~dp0rcon/mcrcon.exe" -H 127.0.0.1 -P 27020 -p %adminPassword% "saveworld"
if %timeHour% EQU %warningHour% if %timeMinute% EQU 59 if %timeSeconds% gtr 5 if %timeSeconds% lss 25 "%~dp0rcon/mcrcon.exe" -H 127.0.0.1 -P 27020 -p %adminPassword% "saveworld"

if %timeHour% EQU %restartHour% if %timeMinute% EQU 00 if %timeSeconds% lss 20 goto ExecuteRestart
	
timeout 1 >nul

goto CheckServerRunning
	
:ExecuteRestart
timeout 1 >nul
"%~dp0rcon/mcrcon.exe" -H %serverIP% -P %rconPort% -p %adminPassword% "DoExit"
timeout 1 >nul
set /A restartCounter+=1
echo Please wait while the %serverName% server is restarted.
timeout 20 >nul
goto ServerUpdate

:ServerNotFound
echo %serverName% server not found
echo.
set /A restartCounter+=1
echo Please wait while the %serverName% server is restarted.
timeout 20 >nul
goto ServerUpdate

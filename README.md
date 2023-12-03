# VGS_ASA_Server_Control_Bot

VGS ASA Server Control Bot
By Crito @Vanaheim Gaming Servers
https://discord.gg/pxC7qSzQ8X
v1.0 11/19/2023

donate to the project:
https://www.paypal.com/paypalme/VanaheimServers

Thanks to:
https://github.com/Tiiffi/mcrcon/
rcon tool used in this project
not altered in any way.

Thanks to:
Fingledobe @Stomping Grounds
His extensive testing throught
the work of this project helped
get it to where it is.
https://discord.gg/stompinggrounds

License:
    zlib/libpng License

install video: 
https://www.youtube.com/watch?v=7GXcJXDNKz8

node.js download
https://nodejs.org/en

Discord developer site
https://discord.com/developers/applications

Bot controls Ark Survival Ascended Server. Designate a specific channel for admin use only so users with
permissions to that channel can usE slash commands to start, Stop, Restart your server from discord
if needed keeping your server files safe.

COMMANDS:
    Start command: Starts server if it is not running
               
    Stop command: will safely save the world and shut down server then shut down the server monitor.

    Restart command: will first check if the server is running or not and if it is running than it will safely 
                     save the world and shut down the server, Then check for any
                     game updates and apply them if needed. Finally the server will start.

    Restart with warning command: Does what the restart command does but gives in game warnings starting at 15 minutes before
                                  the restart takes place to give players time to prepare for restart.

    Shutdown with warning command: Does what the Stop command does but gives in game warnings starting at 15 minutes before
                                   the shutdown takes place to give players time to prepare for shutdown.

    Cancel warning command: can be used to stop the restart with warning command or the shutdown with warning command so server will
                            not perform those actions.

SERVER MONITOR:
    The server monitor is needed if you want your server to perform an auto restart each day.

    This monitors the time and when it reaches 30 minutes prior to your desired restart time it will start sending
    in game warnings to players chat so they have time to log off before world save and server restart.

    It also monitors for server file updates and if it detects them it will send warnings in game 15 minutes before
    restarting server for auto update of server files. Once the server is down it will apply the updates and bring
    server back online.

    If you close the monitor your server will still run but will not perform a restart and will not detect server file updates.

    If you accidently close your monitor than you will have to shut server down and run the start file again
    to start server to get the monitor back up.

EXTRA FEATURES:
    Bot status displays how many players are connected to server vs max player slots available.

    Discord useres can run slash command in discord to see a list of currently connected players.

    Designate a channel for game chat. The Bot will display any in game chat that is sent in global channel to this channel.
    Discord users can chat with players in game thru this channel without being in game.

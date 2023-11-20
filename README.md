# VGS_ASA_Server_Control_Bot

/*
VGS ASA Server Control Bot
By Crito @Vanaheim Gaming Servers
https://discord.gg/pxC7qSzQ8X
v1.0 11/19/2023

Thanks to:
https://github.com/Tiiffi/mcrcon/
rcon tool used in this project
not altered in any way.

License:
    zlib/libpng License
*/

Bot controls Ark Survival Ascended Server. Designate a specific channel for admin use only so users with
permissions to that channel can using slash commands to start, Stop, Restart your server from discord
if needed keeping your server files safe.

Start command: will first check if the server is running or not and if it is running than it will safely 
               save the world and shut down the server and shut down the server monitor. Then check for any
               game updates and apply them if needed. Finally the server will start.
               
Stop command: will safely save the world and shut down server then shut down the server monitor.

Restart command: will first check if the server is running or not and if it is running than it will safely 
                 save the world and shut down the server and shut down the server monitor. Then check for any
                 game updates and apply them if needed. Finally the server will start.
               
The server monitor is needed if you want your server to perform an auto restart each day.
If you close the monitor your server will still run but will not perform a restart each day.
If you accidently close your monitor than you will have to shut server down and run the start file again
to start server to get the monitor back up.

Bot status displays how many players are connected to server vs max player slots available.

Discord useres can run slash command in discord to see a list of currently connected players.

Designate a channel for game chat. The Bot will display any in game chat that is sent in global channel to this channel.
Discord users can chat with players in game thru this channel without being in game.

Server monitor:
The server monitor is needed if you want your server to perform an auto restart each day.
If you close the monitor your server will still run but will not perform a restart each day.
If you accidently close your monitor than you will have to shut server down and run the start file again
to start server to get the monitor back up.

# VGS_ASA_Server_Control_Bot
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

.env file Contents:

#your bots token from bot you create at https://discord.com/developers/
TOKEN = 123456abcefg987654123fjieowjijfaiodjkandgvmnak

#your discord server ID where your bot will be listening
DiscordServer_ID = 123456789987654312

#your bots ID
Bot_ID = 123456789987654312

#discord channel ID where your commands will only work from so normal players cannot mess with your server
Admin_Channel_ID = 123456789987654312

#discord channel ID were in game chat is to be sent to
Chat_Channel_ID = 123456789987654312

#set the patch to the bot folder include the bot folder
Bot_Folder_Path = C:/VGS_ASA_Server_Control_Bot

#max number of players that can join your server.
#Used in bots status showing number of players on vs number of slots available
ServerSlots = 70

#server IP address, Bot should be on same machine as server and use (default 127.0.0.1)
ASA_ServerIP = 127.0.0.1

#set your servers rcon port (default 27020)
ASA_rcon_port = 27020

#put in the password you use to log in as admin in game
ASA_password = yourpasswordhere

#title you would like the embed for current online players list to show
ASA_EmbedTitle = ASA THE ISLAND SERVER:

#name of your start bat that must be located in root of the bot folder
ASA_Start_bat = ASA_The_Island_Start.bat

#name of your stop bat that must be located in root of the bot folder
ASA_Stop_bat = ASA_The_Island_Stop.bat


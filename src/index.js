require('dotenv').config();
const { channel } = require('diagnostics_channel');
const {Client, IntentsBitField, EmbedBuilder, ActivityType} = require ('discord.js');

const fs = require('fs');

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);


        (async function() {
                var rconStatusBat = fs.createWriteStream("./rcon/rcon_BotStatus.bat");
                await sleep(500);
                rconStatusBat.write('%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ListPlayers">%~dp0rcon_BotStatus.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_BotStatus.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_BotStatus.txt"');
                await sleep(500);
                var rconGetChatBat = fs.createWriteStream("./rcon/rcon_GetChat.bat");
                await sleep(500);
                rconGetChatBat.write('%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "GetChat">%~dp0rcon_GetChat.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_GetChat.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_GetChat.txt"');
                await sleep(500);
                var serverStop = fs.createWriteStream("./rcon/serverStop.bat");
                await sleep(500);
                serverStop.write('Taskkill /F /FI "WINDOWTITLE eq ASA The Island Server Monitor"\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "saveworld"\ntimeout 20 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "DoExit"');
                await sleep(500);
                var forcedRestart = fs.createWriteStream("./rcon/forcedRestart.bat");
                await sleep(500);
                forcedRestart.write('%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "saveworld"\ntimeout 20 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "DoExit"');
                var forcedRestartWarn = fs.createWriteStream("./rcon/forcedRestartWarn.bat");
                await sleep(500);
                forcedRestartWarn.write('@echo off\nCOLOR 0a\nTITLE ASA Island Warning Operation\nSETLOCAL EnableExtensions enabledelayedexpansion\necho Do not close this window it will auto close when operation is complete in 15 minutes\necho If this window is forced closed the server stop or restart will be canceled\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 15 MINUTES****"\ntimeout 300 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 10 MINUTES****"\ntimeout 300 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 5 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 4 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 3 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 2 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 1 MINUTE (Saving World)****"\ntimeout 10 > NUL\nstart /min %~dp0forcedRestart.bat');
                await sleep(500);
                var forcedStopWarn = fs.createWriteStream("./rcon/forcedStopWarn.bat");
                await sleep(500);
                forcedStopWarn.write('@echo off\nCOLOR 0a\nTITLE ASA Island Warning Operation\nSETLOCAL EnableExtensions enabledelayedexpansion\necho Do not close this window it will auto close when operation is complete in 15 minutes\necho If this window is forced closed the server stop or restart will be canceled\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 15 MINUTES****"\ntimeout 300 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 10 MINUTES****"\ntimeout 300 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 5 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 4 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 3 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 2 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 1 MINUTE (Saving World)****"\ntimeout 10 > NUL\nstart /min %~dp0serverStop.bat');
                await sleep(500);
                restartCancel = fs.createWriteStream("./rcon/restartCancel.bat");
                await sleep(500);
                restartCancel.write('Taskkill /F /FI "WINDOWTITLE eq ASA Island Warning Operation"\ntimeout 10 >nul\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN CANCELED FORCED RESTART/SHUTDOWN****"');
                await sleep(500);
                var dinoWipe = fs.createWriteStream("./rcon/dinoWipe.bat");
                await sleep(500);
                dinoWipe.write('%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "destroywilddinos"');
            })();

            setInterval(()=>{
                (async function() {
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_BotStatus.bat') , function (){});
                await sleep(1000);
                var rconPlayerCnt = fs.readFileSync('./rcon/rcon_BotStatus.txt', 'utf-8').split(/[,,\n]/);
                var PlyrCount = 0;
                
                    if(rconPlayerCnt[0].trim() === 'No Players Connected'){
                        client.user.setPresence({ 
                            activities: [{ 
                                name: PlyrCount+'/'+(process.env.ServerSlots), 
                                type: ActivityType.Playing,  
                            }], 
                            status: 'online' 
                        });
                    }else{
                        for (let i = 0; i < rconPlayerCnt.length; i++) {                        
                            if(rconPlayerCnt[i].length < 20){
                                if(rconPlayerCnt[i].length > 2){
                                    PlyrCount = PlyrCount + 1
                                }                   
                            }                      
                        }
                            client.user.setPresence({ 
                            activities: [{ 
                            name: PlyrCount+'/'+(process.env.ServerSlots),
                                type: ActivityType.Playing,  
                            }], 
                            status: 'online' 
                        });
                    }

             
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_GetChat.bat') , function (){});
                await sleep(2000);
                var rconGetChat = fs.readFileSync('./rcon/rcon_GetChat.txt', 'utf-8').split(/[\n]/);
                
                    if(rconGetChat[0].trim() === 'Server received, But no response!!'){
                        return
                    }else{
                        for (let i = 0; i < rconGetChat.length; i++) {                        
                            if(rconGetChat[i].length > 2){
                                var PlyrChat = rconGetChat[i];
                                console.log(PlyrChat.substring(0))
                                PlyrChat = PlyrChat.substring(0, PlyrChat.length - 0);

                                if(PlyrChat.includes("(From Discord)")){
                                }else{
                                    if(PlyrChat.includes("AdminCmd")){
                                    }else{
                                        const gameChatEmbed = new EmbedBuilder()
                                        .addFields({name: 'GAME CHAT:', value: (`${PlyrChat}`)})
                                        .setColor(0x00e8ff)
                                        client.channels.cache.get((process.env.Chat_Channel_ID)).send({embeds: [gameChatEmbed]});
                                    }
                                } 
                            }                   
                        }
                    }
                })();
            },10000);
});

client.on('messageCreate', (chatMessage) => {
    if(chatMessage.channelId === (process.env.Chat_Channel_ID)){
        if (chatMessage.author.bot){
            return;
        }else{
            (async function() {
                var message = (chatMessage.content);
                var sender = (chatMessage.author.username);
                var messageToSend = (`(From Discord) ${sender}: ${message}`);
                var rconSendChat = fs.createWriteStream("./rcon/rcon_SendChat.bat");
                await sleep(1000);
                rconSendChat.write('%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat '+(messageToSend)+'"');
                await sleep(1000);
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_SendChat.bat') , function (){});
            })();
        }
    }
})

client.on('interactionCreate', (interaction) =>{
    if(!interaction.isChatInputCommand()) return;
   
    //ASA Island Server
    if (interaction.commandName === 'asa_the_island_server') {
        const asaislandcontroller = interaction.options.get('control').value;

        if(asaislandcontroller === 'start'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                interaction.reply('Starting ASA Server!');
                require('child_process').exec('cmd /c start "" cmd /c ASA_The_Island_Start.bat', function (){});       
            }else{
                interaction.reply('ERROR: You just tried to run an admin command outside of an admin channel!'); 
            }
        }
        
        if(asaislandcontroller === 'stop'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                interaction.reply('Stopping ASA Server.');
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/serverStop.bat') , function (){});
            }else{
                interaction.reply('ERROR: You just tried to run an admin command outside of an admin channel!'); 
            }
        }

        if(asaislandcontroller === 'restart'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                    interaction.reply('Saving World before restart.');
                    require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/forcedRestart.bat') , function (){});    
                    client.channels.cache.get((process.env.Admin_Channel_ID)).send(`Restarting ASA server.`)
            }else{
                interaction.reply('ERROR: You just tried to run an admin command outside of an admin channel!'); 
            }
        }

        if(asaislandcontroller === 'restart_warning'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                interaction.reply("!!!!!!WARNING!!!!!!:\nDo not try to restart server during this process.\nTo stop this process run the bots cancel warning command.\nSending 15 minute restart warning in game.");                   require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/forcedRestartWarn.bat') , function (){});    
                }else{
                interaction.reply('ERROR: You just tried to run an admin command outside of an admin channel!'); 
            }
        }

        if(asaislandcontroller === 'stop_warning'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                interaction.reply("!!!!!!WARNING!!!!!!:\nDo not try to restart server during this process.\nTo stop this process run the bots cancel warning command.\nSending 15 minute shutdown warning in game.");
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/forcedStopWarn.bat') , function (){});    
            }else{
                interaction.reply('ERROR: You just tried to run an admin command outside of an admin channel!'); 
            }
        }

        if(asaislandcontroller === 'cancel_warning'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                interaction.reply("Suspending command operation."); 
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/restartCancel.bat') , function (){});    
            }else{
                interaction.reply('ERROR: You just tried to run an admin command outside of an admin channel!'); 
            }
        }

        if(asaislandcontroller === 'dinowipe'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                interaction.reply('Wiping all wild dinos from map.');
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/dinoWipe.bat') , function (){});    
            }else{
                interaction.reply('ERROR: You just tried to run an admin command outside of an admin channel!'); 
            }
        }
    }

    if (interaction.commandName === 'asa_the_island_players') {
        (async function() {
                var rconBatch = fs.createWriteStream("./rcon/rcon_ASAPlayers.bat");
                await sleep(500)
                rconBatch.write('%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ListPlayers">%~dp0rcon_ASAPlayers.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_ASAPlayers.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_ASAPlayers.txt"');
                await sleep(500)
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_ASAPlayers.bat') , function (){});    
                await sleep(500)
                var playerList = fs.readFileSync('./rcon/rcon_ASAPlayers.txt', 'utf-8').split(/[,,\n]/);
                var newPlayerList = "";
            
                if(playerList[0].trim() === 'No Players Connected'){
                    const plListEmbed = new EmbedBuilder()
                    .setTitle('ASA THE ISLAND SERVER:')
                    .addFields({name: 'ONLINE PLAYERS:', value: ('No Players Connected')})
                    .setColor(0xff0000)
                    interaction.reply({embeds: [plListEmbed]});
                }else{
                    if((playerList.length/2) < 75){
                        for (let i = 0; i < playerList.length; i++) {
                            if(playerList[i].length < 30){
                                let player = playerList[i];
                                newPlayerList = newPlayerList + (`${player}\n`);                  
                            }
                        }
                    }else{
                        newPlayerList = 'Sorry, to many players online to produce a list at this time.'
                    }

                    await sleep(800)
                    if(interaction.channelId !== (process.env.Chat_Channel_ID)){
                    const plListEmbed = new EmbedBuilder()
                    .setTitle('ASA THE ISLAND SERVER:')
                    .addFields({name: 'ONLINE PLAYERS:', value: newPlayerList})
                    .setColor(0x00e8ff)
                    interaction.reply({embeds: [plListEmbed]});
                    }else{interaction.reply('ERROR: You cant send player list to in game chat'); 
                }
            }
        })()     
    }
})

client.login(process.env.TOKEN);
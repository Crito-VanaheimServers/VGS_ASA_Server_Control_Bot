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
                rconStatusBat.write('@echo off\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ListPlayers">%~dp0rcon_BotStatus.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_BotStatus.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_BotStatus.txt"\nexit /b 0');
                await sleep(500);
                var rconGetChatBat = fs.createWriteStream("./rcon/rcon_GetChat.bat");
                await sleep(500);
                rconGetChatBat.write('@echo off\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "GetChat">%~dp0rcon_GetChat.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_GetChat.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_GetChat.txt"\nexit /b 0');
                await sleep(500);
                var serverStop = fs.createWriteStream("./rcon/serverStop.bat");
                await sleep(500);
                serverStop.write('@echo off\nTaskkill /F /FI "WINDOWTITLE eq ASA '+(process.env.Message_Tittle)+' Server Monitor"\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "saveworld"\ntimeout 20 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "DoExit"\nexit /b 0');
                await sleep(500);
                var forcedRestart = fs.createWriteStream("./rcon/forcedRestart.bat");
                await sleep(500);
                forcedRestart.write('@echo off\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "saveworld"\ntimeout 20 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "DoExit"\nexit /b 0');
                var forcedRestartWarn = fs.createWriteStream("./rcon/forcedRestartWarn.bat");
                await sleep(500);
                forcedRestartWarn.write('@echo off\nCOLOR 0a\nTITLE ASA '+(process.env.Message_Tittle)+' warning operation\nSETLOCAL EnableExtensions enabledelayedexpansion\necho Do not close this window it will auto close when operation is complete in 15 minutes\necho If this window is forced closed the server stop or restart will be canceled\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED RESTART 15 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 15 MINUTES****"\ntimeout 300 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED RESTART 10 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 10 MINUTES****"\ntimeout 300 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED RESTART 5 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 5 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED RESTART 4 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 4 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED RESTART 3 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 3 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED RESTART 2 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 2 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED RESTART 1 MINUTE (Saving World)****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED RESTART 1 MINUTE (Saving World)****"\ntimeout 10 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "saveworld"\ntimeout 20 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "DoExit"\nexit /b 0');
                await sleep(500);
                var forcedStopWarn = fs.createWriteStream("./rcon/forcedStopWarn.bat");
                await sleep(500);
                forcedStopWarn.write('@echo off\nCOLOR 0a\nTITLE ASA '+(process.env.Message_Tittle)+' warning operation\nSETLOCAL EnableExtensions enabledelayedexpansion\necho Do not close this window it will auto close when operation is complete in 15 minutes\necho If this window is forced closed the server stop or restart will be canceled\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED SERVER SHUTDOWN 15 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 15 MINUTES****"\ntimeout 300 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED SERVER SHUTDOWN 10 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 10 MINUTES****"\ntimeout 300 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED SERVER SHUTDOWN 5 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 5 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED SERVER SHUTDOWN 4 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 4 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED SERVER SHUTDOWN 3 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 3 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED SERVER SHUTDOWN 2 MINUTES****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 2 MINUTES****"\ntimeout 60 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN FORCED SERVER SHUTDOWN 1 MINUTE (Saving World)****"\ntimeout 1 > NUL\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN FORCED SERVER SHUTDOWN 1 MINUTE (Saving World)****"\ntimeout 10 > NUL\nTaskkill /F /FI "WINDOWTITLE eq ASA '+(process.env.Message_Tittle)+' Server Monitor"\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "DoExit"\nexit /b 0');
                await sleep(500);
                restartCancel = fs.createWriteStream("./rcon/restartCancel.bat");
                await sleep(500);
                restartCancel.write('@echo off\nTaskkill /F /FI "WINDOWTITLE eq ASA '+(process.env.Message_Tittle)+' warning operation"\ntimeout 10 >nul\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "Broadcast ****ADMIN CANCELED FORCED RESTART/SHUTDOWN****"\ntimeout 1 >nul\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat ****ADMIN CANCELED FORCED RESTART/SHUTDOWN****"\n\nexit /b 0');
                await sleep(500);
                var dinoWipe = fs.createWriteStream("./rcon/dinoWipe.bat");
                await sleep(500);
                dinoWipe.write('@echo off\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "destroywilddinos"\nexit /b 0 ');
            })();

            setInterval(()=>{
                (async function() {
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_BotStatus.bat') , function (){});
                await sleep(1000);

                try {
                var rconPlayerCnt = fs.readFileSync('./rcon/rcon_BotStatus.txt', 'utf-8').split(/[,,\n]/);
                await sleep(1000);
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
                } catch (error) {
                    return
                }


             
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_GetChat.bat') , function (){});
                await sleep(1000);
                
                try {
                        var rconGetChat = fs.readFileSync('./rcon/rcon_GetChat.txt', 'utf-8').split(/[\n]/);
                        await sleep(1000);
                        if(rconGetChat[0].trim() === 'Server received, But no response!!'){
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
                    } catch (error) {
                        return
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
                rconSendChat.write('@echo off\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat '+(messageToSend)+'"\nexit /b 0');
                await sleep(1000);
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_SendChat.bat') , function (){});
            })();
        }
    }
})

client.on('interactionCreate', (interaction) =>{
    if(!interaction.isChatInputCommand()) return;
   
    //ASA Island Server
    if (interaction.commandName === (process.env.Map_name)+'_server') {
        const asaislandcontroller = interaction.options.get('control').value;

        if(asaislandcontroller === 'start'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                var commandSender = interaction.user.globalName;
                const sartcommand = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: commandSender, value: "Starting Server."})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [sartcommand]});

                require('child_process').exec('cmd /c start "" cmd /c' + (process.env.Bot_Folder_Path) + ('VGS_ASA_Server_Controller_Start.bat'), function (){});       
            }else{
                const sartcommand = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                .setColor(0xff0000)
                interaction.reply({embeds: [sartcommand]});
            }
        }
        
        if(asaislandcontroller === 'stop'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                var commandSender = interaction.user.globalName;
                const stopcommand = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: commandSender, value: "Saving world and stopping server."})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [stopcommand]});
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/serverStop.bat') , function (){});
            }else{
                const stopcommand = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                .setColor(0xff0000)
                interaction.reply({embeds: [stopcommand]});
            }
        }

        if(asaislandcontroller === 'restart'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                var commandSender = interaction.user.globalName;
                const restartcommand = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: commandSender, value: "Saving world and restarting server."})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [restartcommand]});
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/forcedRestart.bat') , function (){});
            }else{
                const restartcommand = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                .setColor(0xff0000)
                interaction.reply({embeds: [restartcommand]});
            }
        }

        if(asaislandcontroller === 'restart_warning'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                var commandSender = interaction.user.globalName;
                const restartwarning = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: commandSender, value: "!!!!!!WARNING!!!!!!:\nDo not try to restart server during this process.\nTo stop this process run the bots cancel warning command.\nSending 15 minute restart warning in game."})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [restartwarning]});
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/forcedRestartWarn.bat') , function (){});    
                }else{
                    const restartwarning = new EmbedBuilder()
                    .setTitle(process.env.Message_Tittle)
                    .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                    .setColor(0xff0000)
                    interaction.reply({embeds: [restartwarning]});
                }
        }

        if(asaislandcontroller === 'stop_warning'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                var commandSender = interaction.user.globalName;
                const stopwarning = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: commandSender, value: "!!!!!!WARNING!!!!!!:\nDo not try to restart server during this process.\nTo stop this process run the bots cancel warning command.\nSending 15 minute shutdown warning in game."})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [stopwarning]});
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/forcedStopWarn.bat') , function (){});    
            }else{
                const stopwarning = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                .setColor(0xff0000)
                interaction.reply({embeds: [stopwarning]});
            }
        }

        if(asaislandcontroller === 'cancel_warning'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                var commandSender = interaction.user.globalName;
                const cancelwarning = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: commandSender, value: 'Suspending command operation.'})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [cancelwarning]}); 
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/restartCancel.bat') , function (){});    
            }else{
                const cancelwarning = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                .setColor(0xff0000)
                interaction.reply({embeds: [cancelwarning]});
            }
        }

        if(asaislandcontroller === 'dinowipe'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                var commandSender = interaction.user.globalName;
                const rcondinowipe = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: commandSender, value: 'Wiping all wild dinos from map.'})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [rcondinowipe]});
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/dinoWipe.bat') , function (){});    
            }else{
                const rcondinowipe = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                .setColor(0xff0000)
                interaction.reply({embeds: [rcondinowipe]});
            }
        }
    }

    if (interaction.commandName === (process.env.Map_name)+'_rcon') {
        if(interaction.channelId === (process.env.Admin_Channel_ID)){
            (async function() {
                const rconCommand = interaction.options.get('rcon-command').value;
                var rconStr = rconCommand;
                var rconSender = interaction.user.globalName;
                var rconSendCommand = fs.createWriteStream("./rcon/rcon_SendCommand.bat");
                await sleep(500);
                rconSendCommand.write('@echo off\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "'+(rconCommand)+'">%~dp0rcon_ReturnInfo.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_ReturnInfo.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_ReturnInfo.txt"\nexit /b 0');
                await sleep(500);
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_SendCommand.bat') , function (){});
                await sleep(500);
                var rconReturnInfo = fs.readFileSync('./rcon/rcon_ReturnInfo.txt', 'utf-8');
                const rconEmbed = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: rconSender, value: 'RCON command:\n'+rconCommand+'\n'+rconReturnInfo})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [rconEmbed]});
            })();
        }else{
            const rconEmbed = new EmbedBuilder()
            .setTitle(process.env.Message_Tittle)
            .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
            .setColor(0xff0000)
            interaction.reply({embeds: [rconEmbed]});
        }
    }

    if (interaction.commandName === (process.env.Map_name)+'_players') {
        (async function() {
                var rconBatch = fs.createWriteStream("./rcon/rcon_ASAPlayers.bat");
                await sleep(500)
                rconBatch.write('@echo off\n%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ListPlayers">%~dp0rcon_ASAPlayers.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_ASAPlayers.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_ASAPlayers.txt"\nexit /b 0');
                await sleep(500)
                require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_ASAPlayers.bat') , function (){});    
                await sleep(500)
                var playerList = fs.readFileSync('./rcon/rcon_ASAPlayers.txt', 'utf-8').split(/[,,\n]/);
                var newPlayerList = "";
            
                if(playerList[0].trim() === 'No Players Connected'){
                    const plListEmbed = new EmbedBuilder()
                    .setTitle(process.env.Message_Tittle)
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
                    .setTitle(process.env.Message_Tittle)
                    .addFields({name: 'ONLINE PLAYERS:', value: newPlayerList})
                    .setColor(0x00e8ff)
                    interaction.reply({embeds: [plListEmbed]});
                    }else{
                    const plListEmbed = new EmbedBuilder()
                    .setTitle(process.env.Message_Tittle)
                    .addFields({name: 'ERROR:', value: 'You cant send player list to in game chat!'})
                    .setColor(0xff0000)
                    interaction.reply({embeds: [plListEmbed]});
                }
            }
        })()     
    }
})

client.login(process.env.TOKEN);
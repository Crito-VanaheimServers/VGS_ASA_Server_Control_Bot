require('dotenv').config();
const { channel } = require('diagnostics_channel');
const {Client, IntentsBitField, EmbedBuilder, ActivityType} = require ('discord.js');

const fs = require('fs');

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

    setInterval(()=>{
        var rconStatusBat = fs.createWriteStream("./rcon/rcon_BotStatus.bat");
        rconStatusBat.write('%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ListPlayers">%~dp0rcon_BotStatus.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_BotStatus.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_BotStatus.txt"');
        require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_BotStatus.bat') , function (){});

        (async function() {
            const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)) 
            await sleep(500)
            const rconPlayerCnt = fs.readFileSync('./rcon/rcon_BotStatus.txt', 'utf-8').split(/[,,\n]/);
            const newCount = [];

            if(rconPlayerCnt[0].trim() === 'No Players Connected'){
                client.user.setPresence({ 
                    activities: [{ 
                        name: '0/'+(process.env.ServerSlots), 
                        type: ActivityType.Playing,  
                    }], 
                    status: 'online' 
                });
            }else{
                for (let i = 0; i < rconPlayerCnt.length; i++) {                        
                    if(rconPlayerCnt[i].length < 20){
                        if(rconPlayerCnt[i].length > 2){
                            let PlyrCount = rconPlayerCnt[i];
                            PlyrCount = PlyrCount.substring(3, PlyrCount.length - 0);
                            newCount.push(PlyrCount); 
                        }                   
                    }                      
                }
                client.user.setPresence({ 
                    activities: [{ 
                        name: (newCount.length)+'/'+(process.env.ServerSlots), 
                        type: ActivityType.Playing,  
                    }], 
                    status: 'online' 
                });
            }           
        })()
    },30000);

    setInterval(()=>{
        var rconGetChatBat = fs.createWriteStream("./rcon/rcon_GetChat.bat");
        rconGetChatBat.write('%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "GetChat">%~dp0rcon_GetChat.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_GetChat.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_GetChat.txt"');
        require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_GetChat.bat') , function (){});
        
        (async function() {
            const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)) 
            await sleep(500)
            const rconGetChat = fs.readFileSync('./rcon/rcon_GetChat.txt', 'utf-8').split(/[\n]/);;
            newChat = [];

            if(rconGetChat[0].trim() === 'Server received, But no response!!'){
                 return
                }else{
                for (let i = 0; i < rconGetChat.length; i++) {                        
                    if(rconGetChat[i].length > 2){
                        let PlyrChat = rconGetChat[i];
                        PlyrChat = PlyrChat.substring(0, PlyrChat.length - 0);

                        if(PlyrChat.includes("(From Discord)")){
                            return
                        }else{
                            newChat.push(PlyrChat);
                        } 
                     }                   
                 }
                //client.channels.cache.get((process.env.Chat_Channel_ID)).send((`${newChat}`))

                const chatToString = newChat.toString();
                
                const gameChatEmbed = new EmbedBuilder()
                //.setTitle((process.env.ASA_EmbedTitle))
                .addFields({name: 'GAME CHAT:', value: (`${chatToString}`)})
                .setColor(0x00e8ff)
                client.channels.cache.get((process.env.Chat_Channel_ID)).send({embeds: [gameChatEmbed]});
            }         
        })()
    },3000);
})   

client.on('messageCreate', (chatMessage) => {
    if (chatMessage.author.bot){
        return
    }else{
        var message = (chatMessage.content);
        var sender = (chatMessage.author.username);
        var messageToSend = (`(From Discord) ${sender}: ${message}`);
        var rconSendChat = fs.createWriteStream("./rcon/rcon_SendChat.bat");
        rconSendChat.write('%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ServerChat '+(messageToSend)+'">%~dp0rcon_SendChat.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_SendChat.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_SendChat.txt"');
        require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_SendChat.bat') , function (){});
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
                require('child_process').exec('cmd /c start "" cmd /c'+ (process.env.ASA_Start_bat), function (){});
            }else{
                interaction.reply('ERROR: You just tried to run an admin command outside of an admin channel!'); 
            }
        }
        
        if(asaislandcontroller === 'stop'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                interaction.reply('Stopping ASA Server!');
                require('child_process').exec('cmd /c start "" cmd /c' + (process.env.ASA_Stop_bat), function (){});
            }else{
                interaction.reply('ERROR: You just tried to run an admin command outside of an admin channel!'); 
            }
        }

        if(asaislandcontroller === 'restart'){
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                interaction.reply('Restarting ASA Server!');

                (async function() {
                    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
                    require('child_process').exec('cmd /c start "" cmd /c' + (process.env.ASA_Start_bat), function (){});
                    await sleep(20000)
                    client.channels.cache.get((process.env.Admin_Channel_ID)).send(`Starting ASA Server!`)
                })()
            }else{
                interaction.reply('ERROR: You just tried to run an admin command outside of an admin channel!'); 
            }
        }
    }

    if (interaction.commandName === 'asa_the_island_players') {
        var rconBatch = fs.createWriteStream("./rcon/rcon_ASAPlayers.bat");
        rconBatch.write('%~dp0mcrcon.exe -H '+(process.env.ASA_ServerIP)+' -P '+(process.env.ASA_rcon_port)+' -p '+(process.env.ASA_password)+' "ListPlayers">%~dp0rcon_ASAPlayers.txt\nfor /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_ASAPlayers.txt") do (echo(%%a)>>~.txt\nmove /y  ~.txt "%~dp0rcon_ASAPlayers.txt"');
        require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/rcon_ASAPlayers.bat') , function (){});
        
        (async function() {
            const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)) 
            await sleep(500)
            const playerList = fs.readFileSync('./rcon/rcon_ASAPlayers.txt', 'utf-8').split(/[,,\n]/);
            const newPlayerList = [];
            
            if(playerList[0].trim() === 'No Players Connected'){
                const plListEmbed = new EmbedBuilder()
                .setTitle((process.env.ASA_EmbedTitle))
                .addFields({name: 'ONLINE PLAYERS:', value: (`${(playerList[0])}`)})
                .setColor(0xff0000)
                interaction.reply({embeds: [plListEmbed]});
            }else{
                for (let i = 0; i < playerList.length; i++) {                        
                    if(playerList[i].length < 20){
                        let player = playerList[i];
                        player = player.substring(3, player.length - 0);
                        newPlayerList.push(player);                    
                    }
                }

                const playerToString = newPlayerList.toString();
                
                const plListEmbed = new EmbedBuilder()
                .setTitle((process.env.ASA_EmbedTitle))
                .addFields({name: 'ONLINE PLAYERS:', value: (`${playerToString.split(',').join("\r\n")}`)})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [plListEmbed]});
            }
        })()     
    }
 })

client.login(process.env.TOKEN);
require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require ('discord.js');

const commands = [
    {
        name: 'asa_the_island_server',
        description: 'Controls Ark Survival Ascended Island server',
        options: [
            {
                name: 'control',
                description: 'What do you want to do with Ark Survival Ascended The Island server?',
                type: ApplicationCommandOptionType.String,
                choices:[
                    {
                        name: 'start',
                        value: "start",
                    },
                    {
                        name: 'stop',
                        value: "stop",
                    },
                    {
                        name: 'restart',
                        value: "restart",
                    },
                    {
                        name: 'restart with warning',
                        value: "restart_warning",
                    },
                    {
                        name: 'cancel warning command',
                        value: "cancel_warning",
                    },
                    {
                        name: 'shutdown with warning',
                        value: "stop_warning",
                    }
                ],
                required: true,
            }
        ]  
    },

    {
        name: 'asa_the_island_players',
        description: 'See the currently connected players for Ark Survival Ascended The Island server',
    },
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.Bot_ID,
            process.env.DiscordServer_ID),
            {body: commands}
        )

        console.log('slash commands were registered successfully');
    } catch (error){
        console.log(`There was an error: ${error}`);
    }
})();
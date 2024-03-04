import { ApplicationCommandDataResolvable, SlashCommandBuilder } from "discord.js";

export class Commands {
    static all(): ApplicationCommandDataResolvable[] {

        return [
            new SlashCommandBuilder().setName('list-worlds')
                                     .setDescription('Lists all available minecraft worlds.'),
            new SlashCommandBuilder().setName('start-server')
                                     .setDescription('Creates a virtual machine at google cloud platform with a minecraft server.')
                                     .addStringOption(option => option.setName('world')
                                                                      .setDescription('Exact equal world name that you can retrieve from /list-worlds')
                                                                      .setRequired(true))
        ]
    }
}
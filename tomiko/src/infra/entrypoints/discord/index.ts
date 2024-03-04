import { Client, GatewayIntentBits } from 'discord.js';
import { ListWorldsUseCase } from '../../../application/use-cases/list-worlds';
import { StartServerUseCase } from '../../../application/use-cases/start-server';
import { Firestore } from '../../adapters/repositories/firestore-repository';
import { IController, Interaction } from '../../core/interfaces/controller.base';
import { Commands } from './commands';
import { ListWorldsController } from './controllers/list-worlds';
import { StartServerController } from './controllers/start-server';

export class Tomiko {

    private readonly client = new Client({ intents: [ 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages
    ]});

    private readonly entrypoints: { [key: string]: IController } = {
        'list-worlds': new ListWorldsController(new ListWorldsUseCase(new Firestore())),
        'start-server': new StartServerController(new StartServerUseCase(new Firestore()))
    }

    constructor() {
        this.client.login(process.env.TOMIKO_TOKEN);
    }

    async listen() {

        this.client.on('ready', async () => {
            await this.client.application?.commands.set(Commands.all());
            console.log('Tomiko is ready to handle minecraft server operations.');
        });

        this.client.on('interactionCreate', async interaction => {
            if(!interaction.isCommand()) return;

            const entrypoint = this.entrypoints[interaction.commandName];

            if(!entrypoint) return;

            await entrypoint.handle(interaction as unknown as Interaction);
        })
    }
}
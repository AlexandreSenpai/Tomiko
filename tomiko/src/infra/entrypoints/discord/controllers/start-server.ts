import { StartServerUseCase } from "../../../../application/use-cases/start-server";
import { IController, Interaction } from "../../../core/interfaces/controller.base";

export class StartServerController implements IController {

    constructor(private startServerUseCase: StartServerUseCase) {}

    async handle(interaction: Interaction): Promise<void> {
        try {
            
            // @ts-ignore
            const world = interaction?.options.getString('world')

            await interaction.reply({
                content: `Launching minecraft server. It could take a moment 🥱\nRelax, I'm going to notify in this channel when its done 😴`,
                ephemeral: true
            });
            
            const ip = await this.startServerUseCase.execute(world);

            if(!ip) {
                await interaction.channel?.send(`Could not launch the server 😔`);
                return;
            }

            await interaction.channel?.send(`Minecraft server launched successfully. 😮‍💨\nInternal IP: ${JSON.stringify(ip[0])}\nExternal IP: ${JSON.stringify(ip[1])}\nYou should wait a couple of minutes before trying to enter. 😔`);
        } catch(err) {
            console.log(err);
        }
    }
}
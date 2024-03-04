import { ListWorldsUseCase } from "../../../../application/use-cases/list-worlds";
import { IController, Interaction } from "../../../core/interfaces/controller.base";

export class ListWorldsController implements IController {

    constructor(private listWorldsUseCase: ListWorldsUseCase) {}

    async handle(interaction: Interaction): Promise<void> {
        try {
            const worlds = await this.listWorldsUseCase.execute();
            let message = `Mundos disponíveis:\n\n`;
            worlds.forEach((world: { name: string; genre: string }) => {
                message += `🗺️  ${world.name} - ${world.genre}\n`
            })
            interaction.reply({
                content: message,
                ephemeral: true
            })
        } catch(err) {
            console.log(err);
        }
    }
}
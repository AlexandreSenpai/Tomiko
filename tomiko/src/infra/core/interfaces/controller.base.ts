import { CacheType, MessageComponentInteraction, BaseInteraction } from "discord.js";

export type Interaction = MessageComponentInteraction<CacheType> & BaseInteraction<CacheType>;

export interface IController {
    handle(interaction: Interaction): Promise<void>;
}
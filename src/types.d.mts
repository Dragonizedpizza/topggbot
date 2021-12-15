import {
	CommandInteraction,
	ApplicationCommandOptionData,
	CommandInteractionOptionResolver,
	Collection,
} from "discord.js";

export interface Command {
	name: string;
	description: string;
	options: ApplicationCommandOptionData[];
	run({
		interaction,
		args,
	}: {
		interaction: CommandInteraction;
		args: CommandInteractionOptionResolver;
	}): any;
}

export interface CommandsCollection extends Collection<string, Command> {
	aliases: Collection<string, string>;
}

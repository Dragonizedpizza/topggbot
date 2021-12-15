import { Client as CustomClient, Collection } from "discord.js";
import { CommandsCollection, Command as CommandType } from "./types.mjs";
import { readdirSync, statSync } from "fs";
import { join } from "path";

export class Client extends CustomClient {
	public commands: CommandsCollection;

	public constructor(intents: any) {
		super({ intents });

		this.commands = Object.assign(new Collection<string, CommandType>(), {
			aliases: new Collection<string, string>(),
		});
	}
	public async init() {
		for await (const dir of readdirSync("./src/commands")) {
			const files = readdirSync(join("./src/commands", dir)),
				commands = await Promise.all(
					files
						.filter((file) => file.endsWith(".mjs"))
						.map(
							(name) => import(join("./src/commands", dir, name)),
						),
				);

			for (const command of commands) {
				this.commands.set(command.name, command);

				if (command.aliases)
					for (const alias of command.aliases)
						this.commands.aliases.set(alias, command.name);
			}
		}
	}
}

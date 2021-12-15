import { Client } from "./src/Client.mjs";

const client = new Client({ intents: 32767 });

await client.init();

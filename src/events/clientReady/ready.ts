import { setTimeout } from "timers/promises";
import { Client } from "discord.js";
import registerAndAttachCommandsOnClient from "../../utils/registrars/registerCommands.js";
import { checkMonitorAndNotify } from "../../utils/monitor.js";

export default async (client: Client<true>) => {
  console.log(`${client.user.username} (${client.user.id}) is ready 🐬`);
  await registerAndAttachCommandsOnClient(client);

  while (true) {
    await checkMonitorAndNotify(client);

    await setTimeout(1000 * Number(process.env.DELAY));
  }
};

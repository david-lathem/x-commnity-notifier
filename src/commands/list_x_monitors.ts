import { getAllCommunityMonitors } from "../database/queries.js";
import { extendedAPICommand } from "../utils/typings/types.js";
import { MessageFlags } from "discord.js";

export default {
  name: "list_x_monitors",
  description: "List all community monitors",

  execute: async (interaction) => {
    if (interaction.guildId !== process.env.GUILD_ID) return;

    const monitors = getAllCommunityMonitors.all({});

    if (monitors.length === 0) throw new Error("No community monitors found");

    const text = monitors
      .map(
        (m, i) =>
          `\`${i + 1}\`. [${m.communityName}](https://x.com/i/communities/${
            m.communityId
          }) @${m.username}`
      )
      .join("\n\n");

    await interaction.reply({
      content: text,
      flags: MessageFlags.SuppressEmbeds,
    });
  },
} satisfies extendedAPICommand;

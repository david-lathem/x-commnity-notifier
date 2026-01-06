import { createCommunityMonitor } from "../database/queries.js";
import { extendedAPICommand } from "../utils/typings/types.js";

export default {
  name: "add_x_monitor",
  description: "Add a community monitor",
  options: [
    {
      name: "community_name",
      description: "Community name",
      type: 3,
      required: true,
    },
    {
      name: "community_id",
      description: "Community ID",
      type: 3,
      required: true,
    },
    {
      name: "username",
      description: "Username",
      type: 3,
      required: true,
    },
  ],

  execute: async (interaction) => {
    if (interaction.guildId !== process.env.GUILD_ID) return;

    const communityName = interaction.options.getString("community_name", true);
    const communityId = interaction.options.getString("community_id", true);
    const username = interaction.options.getString("username", true);

    createCommunityMonitor.run({
      communityName,
      communityId,
      username,
    });

    await interaction.reply({
      content: `✅ Monitor added for **${communityName}** (@${username})`,
    });
  },
} satisfies extendedAPICommand;

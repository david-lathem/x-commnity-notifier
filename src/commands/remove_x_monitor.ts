import { deleteCommunityMonitor } from "../database/queries.js";
import { extendedAPICommand } from "../utils/typings/types.js";

export default {
  name: "remove_x_monitor",
  description: "Remove a community monitor",
  options: [
    {
      name: "community_id",
      description: "Community ID",
      type: 3,
      required: true,
    },
  ],

  execute: async (interaction) => {
    if (interaction.guildId !== process.env.GUILD_ID) return;

    const communityId = interaction.options.getString("community_id", true);

    const result = deleteCommunityMonitor.run({ communityId });

    if (result.changes === 0) throw new Error("Community monitor not found");

    await interaction.reply(`❌ Monitor removed`);
  },
} satisfies extendedAPICommand;

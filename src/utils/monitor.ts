import { Client } from "discord.js";
import {
  deleteCommunityMonitor,
  getAllCommunityMonitors,
} from "../database/queries.js";
import { setTimeout } from "timers/promises";
import { searchForMemberXApi } from "./fetch.js";

export const checkMonitorAndNotify = async (client: Client) => {
  const monitors = getAllCommunityMonitors.all({});

  for (const monitor of monitors) {
    try {
      await setTimeout(1000 * Number(process.env.DELAY));

      console.log(
        `Searching for ${monitor.communityName} (${monitor.communityId})`
      );

      const res = await searchForMemberXApi(
        monitor.communityId,
        monitor.username
      );

      const isPresent = res.find(
        (r) =>
          r.role === "Member" &&
          r.user_results.result.core.screen_name === monitor.username
      );

      if (!isPresent) {
        console.log(res);

        console.log(
          `Not found for ${monitor.communityId} (${monitor.username})`
        );

        continue;
      }

      console.log(
        `Found for ${monitor.communityName} (${monitor.communityId})`
      );

      const channel = client.channels.cache.get(process.env.NOTIFY_CHANNEL_ID);

      if (!channel || !channel.isSendable()) {
        console.error("Channel to notify not found");

        continue;
      }

      await channel.send(
        `@everyone ${monitor.username} has joined the community [${monitor.communityName}](https://x.com/i/communities/${monitor.communityId})`
      );

      deleteCommunityMonitor.run({ communityId: monitor.communityId });
    } catch (error) {
      console.error(error);

      const channel = client.channels.cache.get(process.env.NOTIFY_CHANNEL_ID);

      if (channel && channel.isSendable()) {
        if (error instanceof Error)
          await channel.send(`Error on X Communtiy Scraper (${error.message})`);
      }

      await setTimeout(1000 * Number(process.env.DELAY));
    }
  }
};

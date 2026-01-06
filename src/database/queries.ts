import {
  CommunityMonitor,
  CreateCommunityMonitorInput,
  DeleteCommunityMonitorInput,
} from "../utils/typings/database.js";
import db from "./index.js";

export const createCommunityMonitor = db.prepare<CreateCommunityMonitorInput>(`
  INSERT INTO communityMonitors (
    communityId,
    communityName,
    username
  )
  VALUES (
    @communityId,
    @communityName,
    @username
  )
  ON CONFLICT(communityId) DO UPDATE SET
    communityName = excluded.communityName,
    username = excluded.username
`);

export const getAllCommunityMonitors = db.prepare<{}, CommunityMonitor>(`
  SELECT
    rowid, *
  FROM communityMonitors
`);

export const deleteCommunityMonitor = db.prepare<DeleteCommunityMonitorInput>(`
  DELETE FROM communityMonitors
  WHERE communityId = @communityId
`);

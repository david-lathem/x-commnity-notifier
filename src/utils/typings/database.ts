export type CommunityMonitor = {
  rowid: number;
  communityId: string;
  communityName: string;
  username: string;
};

export type CreateCommunityMonitorInput = {
  communityId: string;
  communityName: string;
  username: string;
};

export type DeleteCommunityMonitorInput = {
  communityId: string;
};

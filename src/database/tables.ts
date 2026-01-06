import db from "./index.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS communityMonitors (
    communityId TEXT NOT NULL PRIMARY KEY,
    communityName TEXT NOT NULL,
    username TEXT NOT NULL
  );
`);

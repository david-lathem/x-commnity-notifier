declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;

      CSRF_TOKEN: string;
      COOKIE: string;
      GUILD_ID: string;
      NOTIFY_CHANNEL_ID: string;
      ERROR_CHANNEL_ID: string;
      DELAY: string;
    }
  }
}

// // If this file has no import/export statements (i.e. is a script)
// // convert it into a module by adding an empty export statement.
export {};

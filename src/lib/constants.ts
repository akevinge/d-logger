export const __prod__ = process.env.NODE_ENV === "production";

export const prefix = "dl;";

export const botToken = __prod__
  ? process.env.BOT_TOKEN
  : process.env.DEV_BOT_TOKEN;

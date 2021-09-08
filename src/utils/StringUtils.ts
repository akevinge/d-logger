import { allCommands } from "../commands/Commands";

export const extractChannelId = (str: string) => {
  return str.match(new RegExp("(?<=<#).*(?=>)", "g"))?.[0];
};

export const extractCommand = (str: string) => {
  return RegExp(
    `${allCommands.map(({ commandName }) => commandName).join("|")}`
  ).exec(str)?.[0];
};

export const messageContentFilter = (str: string) => {
  return str
    .replace(new RegExp("(http|www).*?(?=\\s|$)", "g"), "")
    .replace(/\n/g, " ");
};

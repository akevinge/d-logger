import { Flags } from "../lib/commandsAndFlags";

export const matchFlag = (str: string, flag: string): string | null => {
  return str.match(new RegExp(`(${flag}\\s\\S*)`, "gi"))?.[0];
};

export const containsFlags = (str: string) => {
  return new RegExp(Object.values(Flags).join("|")).test(str);
};

export const matchAddChannelString = (str: string) => {
  return str.match(
    new RegExp(`(${Flags.ADD_CHANNEL_FLAG}\\s<#.*>\\s\\S*)`, "gi")
  )?.[0];
};

export const matchAddChannelFlagInfo = (
  str: string
): { addChannelId: string | null; channelTags: string | null } => {
  return {
    addChannelId: str.match(new RegExp("(?<=<#).*(?=>)", "gi"))?.[0],
    channelTags: str.match(new RegExp("(?<=>\\s)(.*)", "gi"))?.[0],
  };
};

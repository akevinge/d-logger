import { Flags } from "../lib/commandsAndFlags";

export const matchFlag = (str: string, flag: string): string | null => {
  const match = str.match(new RegExp(`(${flag}\\s\\S*)`, "gi"));
  return match ? match[0] : null;
};

export const containsFlags = (str: string) => {
  return new RegExp(Object.values(Flags).join("|")).test(str);
};

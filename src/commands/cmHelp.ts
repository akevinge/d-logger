import { Message, MessageEmbed } from "discord.js";
import { Commands } from "./Commands";

const cmHelpHandler = ({ channel }: Message) => {
  const commands = Object.values(Commands)
    .map(({ COMMAND_NAME, COMMAND_DESCRIPTION, COMMAND_EXAMPLE }) => ({
      name: COMMAND_DESCRIPTION,
      value: COMMAND_EXAMPLE,
    }))
    .filter(({ name }) => name !== "help");
  channel.send({ embeds: [new MessageEmbed({ fields: commands })] });
};

export default cmHelpHandler;

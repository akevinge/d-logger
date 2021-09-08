import { Message } from "discord.js";
import { pgAddServer } from "../db/pgAddServer";
import { doesServerExist } from "../db/pgCheckExist";
import { Commands } from "./Commands";

const cmAddServerHandler = async ({ channel, guild }: Message) => {
  if (guild) {
    const { id: serverId, ownerId, name: serverName } = guild;

    doesServerExist({ serverId }).then((serverExists) => {
      if (serverExists) {
        channel.send(
          Commands.ADD_SERVER_COMMAND.COMMAND_ERROR_MESSAGES
            .SERVER_ALREADY_EXISTS
        );
      } else {
        pgAddServer({ ownerId, serverId, serverName });
      }
    });
  }
};

export default cmAddServerHandler;

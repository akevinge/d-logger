import { Guild } from "discord.js";
import { pgAddServer } from "../db/pgAddServer";
import { doesServerExist } from "../db/pgCheckExist";

export const guildCreateHandler = ({
  id: serverId,
  name: serverName,
  ownerId,
  description,
}: Guild) => {
  doesServerExist({ serverId }).then((exists) => {
    if (!exists) {
      pgAddServer({
        serverId,
        serverName,
        ownerId,
        serverTags: description ? description : null,
      });
    }
  });
};

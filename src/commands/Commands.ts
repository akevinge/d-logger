import { prefix } from "../lib/constants";

export const Commands = {
  ADD_CHANNEL_COMMAND: {
    COMMAND_NAME: "addC",
    COMMAND_DESCRIPTION: "Add channel",
    COMMAND_EXAMPLE: `${prefix} addC #channel`,
    HANDLER_FILE_NAME: "cmAddChannel",
    COMMAND_ERROR_MESSAGES: {
      CHANNEL_ALREADY_EXISTS: "Channel Already Added",
      INCORRECT_FORMAT: `Incorrect format. Ex: ${prefix} addC #channel`,
      CHANNEL_DOES_NOT_EXIST: `Server has not been added. Please use '${prefix} addS' or ${prefix} for more help `,
    },
  },
  ADD_SERVER_COMMAND: {
    COMMAND_NAME: "addS",
    COMMAND_DESCRIPTION: "Add Server",
    COMMAND_EXAMPLE: `${prefix} addS`,
    HANDLER_FILE_NAME: "cmAddServer",
    COMMAND_ERROR_MESSAGES: {
      SERVER_ALREADY_EXISTS: "Server Already Added",
    },
  },
  HELP_COMMAND: {
    COMMAND_NAME: "help",
    COMMAND_DESCRIPTION: "help",
    COMMAND_EXAMPLE: `${prefix} help`,
    HANDLER_FILE_NAME: "cmHelp",
  },
};

export const allCommands: {
  commandName: string;
  commandHandlerFile: string;
}[] = Object.values(Commands).map(({ COMMAND_NAME, HANDLER_FILE_NAME }) => ({
  commandHandlerFile: HANDLER_FILE_NAME,
  commandName: COMMAND_NAME,
}));

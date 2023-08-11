import type {
  ClientEvents,
  CommandInteractionOptionResolver,
  PermissionResolvable,
  SlashCommandBuilder,
} from "discord.js";
import Bot from "./Bot";

type RunCallback<T> = (
  client: Bot,
  interaction: ClientEvents["interactionCreate"][0],
  options: CommandInteractionOptionResolver
) => T;

type AutocompleteOptionsCallback = (
  input: string,
  index: number,
  interaction: ClientEvents["interactionCreate"][0],
  client: Bot
) => Promise<
  {
    name: string;
    value: string;
  }[]
>;

declare class SlashCommand<T = unknown> extends SlashCommandBuilder {
  type: number;
  run: RunCallback<T>;
  ownerOnly: boolean | undefined;
  usesDb: boolean | undefined;
  usage: string | "" | undefined;
  category: string | "misc" | undefined;
  permissions: PermissionResolvable[];
  botPermissions: PermissionResolvable[];
  autocompleteOptions: AutocompleteOptionsCallback | undefined;
  subCommandHandlers: Map<string, this["run"]>;

  constructor();

  /**
   * sets the command run function
   */
  setRun(callback: this["run"]): this;

  /**
   * sets a command to be owner accessible only
   */
  setOwnerOnly(): this;

  /**
   * tells the the command if it's using DBMS or not
   */
  setDBMS(): this;

  /**
   * sets the intended usage for a command as a string, which will be grabbed by the `help` command
   * syntax: /<commandName> <args?...>
   */
  setUsage(usage?: string): this;

  /**
   * sets the intended category for the command, useful for finding mismatches
   */
  setCategory(category?: string): this;

  /**
   * Set user permissions required to run this command
   */
  setPermissions(permissions?: this["permissions"]): this;

  /**
   * Set bot permissions required to run this command
   */
  setBotPermissions(permissions?: this["botPermissions"]): this;

  /**
   * Set the available autocomplete options for a string command option
   */
  setAutocompleteOptions(
    autocompleteOptions: AutocompleteOptionsCallback
  ): this;

  /**
   * @discordjs/builders doesn't export SlashSubCommandBuilder class so we can't modify it
   * We have to implement subcommand handler in the main class
   */
  handleSubCommandInteraction: this["run"];

  setSubCommandHandler(name: string, cb: this["run"]): this;

  getSubCommandHandler(name: string): this["run"] | undefined;
}

export = SlashCommand;

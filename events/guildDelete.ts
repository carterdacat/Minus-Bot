import {MessageEmbed, TextChannel, Message, Collection, Guild} from "discord.js";
import {error_red, log_yellow} from "../Formats/config";
import ClientManager from "../ClientManager";
import {convertMs} from "../utils";
import {Client as PgClient} from "pg";
import * as module from "module";

export let name = "guildDelete";
export let invoke = "guildDelete";

export async function execute(
    client: ClientManager,
    guild: Guild,
) {
    guild = await guild.fetch();
    console.log(client.db)
}
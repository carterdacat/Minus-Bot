import {MessageEmbed, TextChannel, Message, Collection, Guild} from "discord.js";
import {error_red, log_yellow} from "../Formats/config";
import ClientManager from "../ClientManager";
import {convertMs} from "../utils";
import {Client as PgClient} from "pg";
import * as module from "module";
import {server} from '../Formats/schemas'

export let name = "guildCreate";
export let invoke = "guildCreate";

export async function execute(
    client: ClientManager,
    guildCreate: Guild,
) {

    let guild: Guild = await guildCreate.fetch()
    await client.db.query('INSERT INTO servers VALUES ($1, $2, $3, $4, $5, $6, $7)', [guild.id, '!', null, null, null, null, null]);
    let embed = new MessageEmbed();
    embed
        .setDescription('Im so glad you added me here! \n' +
            'My prefix is ! by default. \n' +
            'You can do !setup to set me up for your server!')
    return await guild.owner.send(embed)
        .catch((error) => {
            console.log(error)
        })
}
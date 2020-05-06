import {Guild} from "discord.js";
import ClientManager from "../ClientManager";
import DBServer from '../Formats/schemas'
import * as mongoose from "mongoose";

export let name = "serverDelete";
export let invoke = "guildDelete";

export async function execute(
    client: ClientManager,
    guild: Guild,
) {
    guild = await guild.fetch();
    DBServer.deleteOne({serverID: guild.id}, err => {
        err ? console.error(err) : null;
    });
}

import ClientManager from "../../ClientManager";

import {
    Message
} from "discord.js";


export let name = "servercreate";

export async function execute(
    client: ClientManager,
    message: Message,
    _args: string[]
) {
    client.emit('guildCreate', message.guild);
}
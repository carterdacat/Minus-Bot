import ClientManager from "../../ClientManager";
import {
    swiss_blue
} from "../../Formats/config";
import {
    Message,
    GuildMember,
    MessageEmbed,
    ReactionCollector,
    MessageReaction,
    User
} from "discord.js";
import {
    awaitMessage,
    getRandom
} from "../../utils";

export let name = "serverCreate";

export async function execute(
    client: ClientManager,
    message: Message,
    _args: string[]
) {
    console.log('test')
    client.emit('guildCreate', message.guild);
}
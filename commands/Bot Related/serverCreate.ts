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

export let name = "servercreate";

export async function execute(
    client: ClientManager,
    message: Message,
    _args: string[]
) {
    client.emit('guildCreate', message.guild);
}
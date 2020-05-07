import {MessageEmbed, Guild} from "discord.js";
import ClientManager from "../ClientManager";
import DBServer from '../Formats/schemas'

export let name = "serverCreate";
export let invoke = "guildCreate";

export async function execute(
    _: ClientManager,
    guildCreate: Guild,
) {
    const guild: Guild = await guildCreate.fetch()
    const newGuild = new DBServer({
        serverID: guild.id,
        prefix: '!',
        modID: null,
        adminID: null,
        logID: null,
        announceID: null,
        blockedCommands: []
    })
    await newGuild.save()
    let embed = new MessageEmbed();
    embed
        .setDescription('Im so glad you added me here! \n' +
            'My prefix is ! by default. \n' +
            'You can do !setup to set me up for your server!')
    await guild.owner.send(embed)
        .catch((error) => {
            console.log(error)
        })
}

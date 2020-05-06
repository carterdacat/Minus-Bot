import {MessageEmbed, TextChannel, Message, Collection} from "discord.js";
import {error_red, log_yellow} from "../Formats/config";
import ClientManager from "../ClientManager";
import {convertMs} from "../Formats/utils";
import {Client as PgClient} from "pg";

export let name = "commandHandler";
export let invoke = "message";

export async function execute(
    client: ClientManager,
    message: Message,
) {
    if (message.channel.type === "dm") {
        return;
    }
    const prefixes = [
        client.dev ? "?" : '?'
    ];

    if (
        !prefixes.some(prefix => message.content.startsWith(prefix)) ||
        message.author.bot
    )
        return;
    const prefix = prefixes.find(prefix => message.content.startsWith(prefix));
    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd: { aliases: string | string[] }) =>
                cmd.aliases && cmd.aliases.includes(commandName)
        );
    if (!args[0] && !commandName) return;
    if (!command) return


    if (command.args && !args.length) {
        const embed = new MessageEmbed()
        client.commandsFailed += 1;
        embed
            .setAuthor(
                `${message.author.tag} | Not enough arguments`,
                message.author.avatarURL()
            )
            .setColor(error_red)
            .addField("Error", "You didn't provide any arguments!");
        if (command.usage) {
            const pUsage = `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            embed.addField("Usage:", `The proper usage would be ${pUsage} `);
        }
        return await message.channel.send(embed);
    }

    if (
        !(command.permissions || []).every(perm =>
            message.member.hasPermission(perm)
        )
    ) {
        if (message.author.id === "660238973943152707") return;
        const missingPerms = (command.permissions || []).filter(
            perm => !message.member.hasPermission(perm)
        );
        client.commandsFailed = client.commandsFailed + 1;
        const embed = new MessageEmbed()
            .setAuthor(
                `${message.author.tag} | Missing Permissions`,
                message.author.avatarURL()
            )
            .setColor(error_red)
            .addField(
                "Missing Perms!",
                `Hey <@${message.author.id}>, you need to have \`${missingPerms.join(
                    "`, `"
                )}\` permissions to use this command.`
            )
            .setFooter(client.version)
            .setTimestamp();
        return message.channel.send(embed);
    }

    try {
        const startTime = Date.now();
        await command.execute(client, message, args, client.db);
        client.commandsExecuted = client.commandsExecuted + 1;
    } catch (error) {
        const userMen = message.author.id;
        client.commandsFailed = client.commandsFailed + 1;
        // eslint-disable-next-line no-console
        console.error(error);
        const err = new MessageEmbed()
            .setAuthor(`${message.author.tag} | Error`, message.author.avatarURL())
            .setTitle("An Error Occurred")
            .setColor(error_red)
            .setDescription(
                `An error occurred. Please report this error to a Swiss Minus developer with the following message \`\`\`${error}\`\`\``
            );
        return await message.channel.send(err);
    }
}

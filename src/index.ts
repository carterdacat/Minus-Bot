/* eslint-disable consistent-return */
/* eslint-disable global-require */
import dotenv from "dotenv";
import express from "express";
import { MessageEmbed, TextChannel } from "discord.js";
import { join } from "path";
import { Client as PgClient } from "pg";
// import { version } from "../package.json"; importing it like this includes the package.json in the build which includes the src folder
const { version } = require("../package.json");
import SwissClient from "./SwissClient";
// import { log_yellow, error_red } from "./config";
// import ffmpeg from "ffmpeg-static";
// import opus from "node-opus";
// import ytdl from "ytdl-core";

dotenv.config({ path: join(__dirname, "../.env") });
const dev = !!process.env.dev;
const db = new PgClient({
  connectionString: dev ? process.env.dev_db_url : process.env.DATABASE_URL,
  ssl: true
});
db.connect().then(_ => {
  console.log("Connected to database.");
});

const client = new SwissClient(
  { db, dev, version, commandPath: "./commands", eventPath: "./events" },
  { partials: ["MESSAGE", "CHANNEL", "REACTION"] }
);
let count: number;
client.on("messageReactionAdd", async reaction => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.message.id === "687721364098252811") {
    await db.query("UPDATE settings SET value = 'on' WHERE name = 'bot'");
  }
});
client.login(process.env.token).then(async _token => {
  console.log(`Ready as ${client.user.tag}`);
  client.user
    .setActivity(`the ${version} update`, { type: "WATCHING" })
    .then()
    .catch(console.error);
});

export async function getSetting(name: string) {
  const res = await db.query("SELECT value FROM settings WHERE name = $1", [
    name
  ]);
  return res.rows[0].value;
}
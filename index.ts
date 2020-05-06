/* eslint-disable consistent-return */
/* eslint-disable global-require */
import dotenv from "dotenv";
import express from "express";
import {MessageEmbed, TextChannel} from "discord.js";
import {join} from "path";

const {version} = require("./package.json");
import ClientManager from "./ClientManager";
import mongoose from "mongoose"

dotenv.config({ path: join(__dirname, "/.env") });
const dev = !!process.env.dev;
let db;
(async () => {
db = await mongoose.connect(process.env.MONGODB_, {useNewUrlParser: true, useUnifiedTopology: true})

const client = new ClientManager(
    {db, dev, version, commandPath: "./commands", eventPath: "./events"},
    {partials: ["MESSAGE", "CHANNEL", "REACTION"]}
);
client.login(process.env.token).then(async _token => {
  console.log(`Ready as ${client.user.tag}`);
  client.user
      .setActivity(`the ${version} update`, {type: "WATCHING"})
      .then()
      .catch(console.error);
})})();

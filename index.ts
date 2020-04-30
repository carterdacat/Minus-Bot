/* eslint-disable consistent-return */
/* eslint-disable global-require */
import dotenv from "dotenv";
import express from "express";
import {MessageEmbed, TextChannel} from "discord.js";
import {join} from "path";

const {version} = require("./package.json");
import ClientManager from "./ClientManager";
import mongoose from "mongoose"


dotenv.config({path: join(__dirname, "../.env")});
const dev = !!process.env.dev;
let db;
console.log(process.env.MONGODB_)
mongoose.connect(process.env.MONGODB_, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(a => db = a)
let connection = db.connection
connection.once('open', () => {
  console.log('Connected to MongoDB')
})

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
});

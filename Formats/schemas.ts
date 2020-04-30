import mongoose from 'mongoose'

export let server = new mongoose.Schema({
    "serverID": String,
    "prefix": String,
    "modID": String,
    "adminID": String,
    "logID": String,
    "announceID": String,
    "blockedCommands": Array
})

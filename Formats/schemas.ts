import mongoose from 'mongoose'

interface ServerSchema extends mongoose.Document {
  serverID: string;
  prefix: string;
  modID: string;
  adminID: string;
  logID: string;
  announceID: string;
  blockedCommands: string;
}

const DBServer = new mongoose.Schema({
    "serverID": String,
    "prefix": String,
    "modID": String,
    "adminID": String,
    "logID": String,
    "announceID": String,
    "blockedCommands": Array,
})


export default mongoose.model<ServerSchema>("Server", DBServer, "servers")

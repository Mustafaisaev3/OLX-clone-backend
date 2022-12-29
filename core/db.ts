import mongoose, { ConnectOptions } from "mongoose";

mongoose.Promise = Promise

mongoose.connect('mongodb://localhost:27017/olx_clone',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUifiedTopology: true,
    useFindAndModify: false
} as ConnectOptions)

const db = mongoose.connection

db.on('error', console.error.bind(console, "connection error"))

export {db, mongoose}
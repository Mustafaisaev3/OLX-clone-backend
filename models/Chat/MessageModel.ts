import { Schema, model } from "mongoose";

export const MessageSchema = new Schema({
    message: {
        type: String,
        require: true
    },
    sender: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    conversation: {
        type: Schema.Types.ObjectId, ref: 'Coversation'
    }

}, {timestamps: true})

export const MessageModel = model('Message', MessageSchema)
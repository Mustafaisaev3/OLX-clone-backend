import {Schema, model, Document} from 'mongoose'

const objectId = Schema.Types.ObjectId

export const ConversationSchema = new Schema({
    ad: {
        type: Schema.Types.ObjectId, ref: 'Ad',
        require: true
    },
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],

}, {timestamps: true})

export const ConversationModel = model('Conversation', ConversationSchema)
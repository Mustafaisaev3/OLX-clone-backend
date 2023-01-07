import { Schema, model } from 'mongoose'

export const AdSchema = new Schema({
    status: String,
    title: {
        require: true,
        type: String
    },
    description: {
        require: true,
        type: String
    },
    photos: {
        require: true,
        type: String
    },
    category: {
        require: true,
        type: Array
    },
    options: Array,
    place: String,
    price: String,
    e_mail: String,
    phone: String,
}, {timestamps: true})

export const AdModel = model('Ad', AdSchema)
import { Schema, model, Document } from 'mongoose'

export interface AdModelInterface {
    status: string,
    title: string,
    description: string,
    photos: [],
    category: string,
    options: [],
    place: string,
    price: string,
    e_mail: string,
    phone: string,
    user: string
}

export type AdModelDocumentInterface = AdModelInterface & Document

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
        type: Array
    },
    category: {type: Schema.Types.ObjectId, ref: 'Category', require: true},
    options: Array,
    place: String,
    price: {type: Object},
    e_mail: String,
    phone: String,
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
}, {timestamps: true})

export const AdModel = model('Ad', AdSchema)
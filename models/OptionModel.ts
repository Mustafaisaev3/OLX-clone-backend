import { Schema, model, Document } from 'mongoose'

const objectId = Schema.Types.ObjectId

export interface OptionModelInterface {
    _id?: string,
    name: string,
    fieldType: string,
    values: string[],

}

export type CategoryModelDocumentInterface = OptionModelInterface & Document

export const OptionSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    fieldType: {
        type: String,
        require: true
    },
    values: {
        type: Array,
    },
}, {timestamps: true})

export const OptionModel = model<OptionModelInterface>('Option', OptionSchema)




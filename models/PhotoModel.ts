import { Schema, model, Document } from "mongoose";
import { AdModelInterface } from "./AdModel";
import { UserModelInterface } from "./UserModel";

const objectId = Schema.Types.ObjectId

export interface PhotoModelInterface {
    _id?: string,
    name: string,
    path: string,
    // ad: AdModelInterface,
    // user: UserModelInterface
}

export type PhotoModelDocumentInterface = PhotoModelInterface & Document

export const PhotoSchema = new Schema({
    name: {type: String, required: true},
    path: {type: String, default: ''},
    ad: {type: objectId, ref: 'Ad'},
    user: {type: objectId, ref: 'User'},
}, {timestamps: true})

export const PhotoModel = model('Photo', PhotoSchema)
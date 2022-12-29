import {model, Schema, Document} from "mongoose";

export interface UserModelInterface {
    _id?: string,
    email: string,
    phone: string,
    fullname: string,
    password: string,
    location: string,
}

export type UserModelDocumentInterface = UserModelInterface & Document


const UserSchema = new Schema<UserModelInterface>({
    email: {
        unique: true,
        type: String,
        require: true
    },
    fullname: {
        type: String
    },
    phone: {
        type: String
    },
    location: {
        type: String
    },
    password: {
        required: true,
        type: String,
    }
}, {timestamps: true})

export const UserModel = model<UserModelDocumentInterface>('User', UserSchema)
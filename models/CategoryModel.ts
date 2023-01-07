// const { Schema, model, ObjectId, Document } = require('mongoose')
import { Schema, model, Document } from 'mongoose'

const objectId = Schema.Types.ObjectId

export interface CategoryModelInterface {
    _id?: string,
    key: string,
    name: string,
    image: string,
    background_color?: string,
    // parent: CategoryModelInterface,
    // children: CategoryModelInterface[],
}

export type CategoryModelDocumentInterface = CategoryModelInterface & Document


export const CategorySchema = new Schema({
    name: {
        require: true,
        type: String
    },
    price: Boolean,
    photos_num: Number,
    image: String,
    color: String,
    options: [{type: Schema.Types.ObjectId, ref: 'Option'}],
    parent: {type: Schema.Types.ObjectId, ref: 'Category'},
    children: [{type: Schema.Types.ObjectId, ref: 'Category'}],
}, {timestamps: true})


// module.exports = model<CategoryModelInterface>('Category', CategorySchema)
export const CategoryModel = model<CategoryModelInterface>('Category', CategorySchema)




// const Category = {
//     id: 1,
//     name: 'Auto',
//     price: true,
//     photos_num: 20,
//     options: [
//         {
//             name: 'Технічний стан',
//             fieldType: FormFieldTypesInterface.checkboxes,
//             options: [
//                 'На ходу, технічно справна',
//                 'Не бита',
//                 'Не фарбована',
//                 'Гаражне зберігання',
//                 'Перший власник',
//                 'Сервісна книжка',
//                 'Потребує кузовного ремонту',
//                 'Потребує ремонту ходової',
//                 'Потребує ремонту двигуна',
//                 'Після ДТП',
//                 'Не на ходу',
//             ],
//         },
//         {
//             name: 'Мультимедіа',
//             fieldType: FormFieldTypesInterface.checkboxes,
//             options: [
//                 'CD',
//                 'AUX',
//                 'Bluetooth',
//                 'USB',
//                 'Акустика',
//                 'Магнітола',
//                 'Підсилювач',
//                 'Сабвуфер',
//                 'Система навігації GPS',
//                 'Apple CarPlay',
//                 'Android Auto',
//             ],
//         },
//         {
//             name: 'Модифікація',
//             fieldType: FormFieldTypesInterface.input
//         },
//         {
//             name: 'Рік випуску*',
//             fieldType: FormFieldTypesInterface.input
//         },
//     ]

// }
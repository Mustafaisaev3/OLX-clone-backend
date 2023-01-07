import express from 'express'
import { CategoryModel } from '../models/CategoryModel'

class CategoryController {
    async getAllCategories (req: express.Request, res: express.Response) {
        try {

            // const AllCategories = await CategoryModel.find({})
            const AllCategories = await CategoryModel.find({}).populate('parent').populate('options').exec()
            
            res.status(200).json({status: 'success', data: AllCategories})
        } catch (error) {
            res.status(400).json({error, hhh: 'hhh'})
        }
    }

    async createCategory (req: express.Request, res: express.Response) {
        try {
            const { name, price, photos_num, image, color, options, parent, children} = req.body

            const data = {
                name, 
                price, 
                photos_num, 
                image, 
                color, 
                options, 
                parent, 
                children,
            }

            const newCategory = await CategoryModel.create(data)

            res.status(200).json({status: 'success', data: newCategory})
        } catch (error) {
            res.status(400).json({error})
        }
    }

    async getCategory (req: express.Request, res: express.Response) {
        try {
            const { categoryId } = req.body
            console.log(categoryId)
            const targetCategory = await CategoryModel.find({_id: categoryId}).populate('options').populate('parent')
            res.status(200).json({status: 'success', data: targetCategory[0]})


        } catch (error) {
            res.status(400).json({error})
        }
    }
}

export const CategoryCtrl = new CategoryController()

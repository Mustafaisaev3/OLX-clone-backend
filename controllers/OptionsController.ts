import express from "express";
import { CategoryModel } from "../models/CategoryModel";
import { OptionModel } from "../models/OptionModel";

class OptionController {
    async createOption (req: express.Request, res: express.Response) {
        try {
            const { name, fieldType, values } = req.body
            
            const data = {
                name, 
                fieldType, 
                values,
            }
            const newOption = await OptionModel.create(data)

            res.status(200).json({status: 'success', data: newOption})

        } catch (error) {
            res.status(400).json({error})
        }
    }

    async getAllOptions (req: express.Request, res: express.Response) {
        try {
            const allOptions = await OptionModel.find({})

            res.status(200).json({status: 'success', data: allOptions})
            
        } catch (error) {
            res.status(400).json({error})
        }
    }
    

}

export const OptionCtrl = new OptionController()
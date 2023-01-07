import express from 'express'
import { AdModel } from '../models/AdModel'

class AdController {
    async getAllAds (req: express.Request, res: express.Response) {
        try {
            const Ads = await AdModel.find({})

            res.status(200).json({status: 'success', data: Ads})
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export const AdCtrl = new AdController()
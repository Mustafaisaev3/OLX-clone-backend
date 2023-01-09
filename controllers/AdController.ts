import express from 'express'
const fs = require('fs');
import { AdModel } from '../models/AdModel'
import { PhotoModel } from '../models/PhotoModel'

class AdController {
    async getAllAds (req: express.Request, res: express.Response) {
        try {
            const Ads = await AdModel.find({})

            res.status(200).json({status: 'success', data: Ads})
        } catch (error) {
            res.status(400).json(error)
        }
    }
    
    async createAd (req: any, res: express.Response) {
        try {
            const { status, title, description, category, options, place, price, e_mail, phone, user } = JSON.parse(req.body.data) 
            const photos = req.files
        
            const newAd = await AdModel.create({
                status,
                title,
                description,
                category,
                options,
                place,
                price,
                e_mail,
                phone,
                photos: [],
                user,
            })

            console.log(status, title, description, category, options, place, price, e_mail, phone, user, 'status')
            const photoObjArray = Object.values(photos)
            photoObjArray.forEach(async (photo: any) => {
                const path = `${process.env.FILE_PATH}\\${user}`

                if (!fs.existsSync(path)){
                    fs.mkdirSync(path);
                }
                const dbPhoto = new PhotoModel({
                    name: photo.name,
                    path: `${process.env.FILE_PATH}\\${user}\\${photo.name}`,
                    ad: newAd._id,
                    user: user
                })

                photo.mv(`${process.env.FILE_PATH}\\${user}\\${photo.name}`)  
                
                newAd.photos.push(dbPhoto._id)
            });
            
            await newAd.save()

            res.status(200).json({status: 'success'})

        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export const AdCtrl = new AdController()
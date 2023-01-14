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
    
    async getAd (req: express.Request, res: express.Response) {
        try {
            const {id} = req.body
            let ad = await AdModel.findOne({_id: id}).populate('user').populate('photos').populate('options.id')
            
            const images: any = []
            ad?.photos.map((photo) => {
                // @ts-ignore
                let photoObj = fs.readFileSync(`C:\\Users\\User\\OLX-clone-backend\\files\\${photo.user}\\${photo.ad}\\${photo.name}`, {encoding: 'base64'})
                images.push(`data:image/png;base64,${photoObj}`)
            })
            
            if(ad){
    
                res.status(200).json({status: 'success', data: ad, images})
            } else {
                res.status(404).json({status: 'error', message: 'Ad not found'})
            }

            
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
                const path = `${process.env.FILE_PATH}\\${user}\\${newAd._id}`

                if (!fs.existsSync(path)){
                    fs.mkdirSync(path);
                }
                const dbPhoto = new PhotoModel({
                    name: photo.name,
                    path: `${process.env.FILE_PATH}\\${user}\\${newAd._id}\\${photo.name}`,
                    ad: newAd._id,
                    user: user
                })
                dbPhoto.save()
                console.log(dbPhoto)

                photo.mv(`${process.env.FILE_PATH}\\${user}\\${newAd._id}\\${photo.name}`)  
                
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
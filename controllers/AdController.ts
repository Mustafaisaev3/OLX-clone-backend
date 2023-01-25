import express from 'express'
const fs = require('fs');
import { AdModel } from '../models/AdModel'
import { PhotoModel } from '../models/PhotoModel'
import { UserModel } from '../models/UserModel';

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
            const id = req.params.id
            // const {adId} = req.body
            let ad = await AdModel.findOne({_id: id}).populate('user').populate('photos').populate('options.id')
            console.log(id, req.url)
            // const {id} = req.body
            // let ad = await AdModel.findOne({_id: id}).populate('user').populate('photos').populate('options.id')
            
            // const images: any = []
            // ad?.photos.map((photo) => {
            //     // @ts-ignore
            //     let photoObj = fs.readFileSync(`C:\\Users\\User\\OLX-clone-backend\\files\\${photo.user}\\${photo.ad}\\${photo.name}`, {encoding: 'base64'})
            //     images.push(`data:image/png;base64,${photoObj}`)
            // })
            
            if(ad){
    
                res.status(200).json({status: 'success', data: ad})
            } else {
                res.status(404).json({status: 'error', message: 'Ad not found'})
            }

            
        } catch (error) {
            res.status(400).json(error)
        }
    }

    async getUserAds (req: express.Request, res: express.Response) {
        try {
            const userId = req.body.id
            let ads = await AdModel.find({user: userId}).populate('user').populate('photos')
            console.log(ads)

            
            if(ads){
    
                res.status(200).json({status: 'success', data: ads})
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

            // let photos_arr: any = []
            const photoObjArray = Object.values(photos)
            photoObjArray.forEach(async (photo: any) => {
                const path1 = `${process.env.FILE_PATH}\\${user}`
                const path2 = `${process.env.FILE_PATH}\\${user}\\${newAd._id}`
                
                if (!fs.existsSync(path1)){
                    fs.mkdirSync(path1);
                }
                if (!fs.existsSync(path2)){
                    fs.mkdirSync(path2);
                }
                
                await photo.mv(`${process.env.FILE_PATH}\\${user}\\${newAd._id}\\${photo.name}`) 

                let base64_photo = await fs.readFileSync(`${process.env.FILE_PATH}\\${user}\\${newAd._id}\\${photo.name}`, {encoding: 'base64'})
                let photo_url = `data:image/png;base64,${base64_photo}`

                const dbPhoto = new PhotoModel({
                    name: photo.name,
                    url: photo_url,
                    path: `${process.env.FILE_PATH}\\${user}\\${newAd._id}\\${photo.name}`,
                    ad: newAd._id,
                    user: user
                })
                await dbPhoto.save()
                // newAd.photos.push(dbPhoto._id)
                newAd.photos.push(dbPhoto._id)

                if(newAd.photos.length == photoObjArray.length){
                    newAd.save()
                }
            });
            
            // newAd.photos = photos_arr
            // await newAd.save()

            res.status(200).json({status: 'success'})
            
        } catch (error) {
            res.status(400).json(error)
        }
    }
    
    async deleteAd (req: any, res: express.Response) {
        try {
            // const {id} = req.body
            const id = req.params.id
            
            
            const ad = await AdModel.findById(id)
            
            if(ad){
                // if(String(tweet.user._id) === String(user._id)){
                //     tweet.delete()
                //     res.send()
                // } else {
                    //     res.status(403).send()
                    // }
                ad.delete()
                res.status(200).json({status: 'success', message: 'Ad succesfuly deleted!'})
                
            } else {
                res.status(404).send()
            }

            res.send()

        } catch (error) {
            res.status(400).json(error)
        }
    }

    async deactivateAd (req: any, res: express.Response) {
        try {
            const id = req.body.id

            const Ad = await AdModel.findById(id)

            if(Ad) {
                Ad.active = false
                await Ad.save()

                res.status(200).json({status: 'success'})
            } else {
                res.status(404).json({status: 'error', message: 'Ad not found'})
            }


        } catch (error) {
            res.status(400).json(error)
        }
    }

    async activateAd (req: any, res: express.Response) {
        try {
            const id = req.body.id

            const Ad = await AdModel.findById(id)

            if(Ad) {
                Ad.active = true
                await Ad.save()

                res.status(200).json({status: 'success'})
            } else {
                res.status(404).json({status: 'error', message: 'Ad not found'})
            }


        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export const AdCtrl = new AdController()


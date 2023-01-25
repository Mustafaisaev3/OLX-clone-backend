import express from "express";
import { UserModel } from "../models/UserModel";
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    async index (req: express.Request, res: express.Response) {
        try {
            return res.status(200).json({message: 'Its work fine!)'})
        } catch (error) {
            console.log(error)
        }
    }

    async register (req: express.Request, res: express.Response) {
        try {
            const { email, password, phone } = req.body

            const isUser = await UserModel.findOne({email})

            if(isUser) return res.status(400).json({status: 'error', message: 'Такой аккаунт уже существует'})

            const hashPassword = await bcrypt.hash(password, 5)

            const data = {
                email,
                phone,
                password: hashPassword,
            }

            const user = await UserModel.create(data)
            const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'})

            return res.status(200).json({
                status: 'success', 
                data: {user, token}
            })
            
        } catch (error) {
            console.log(error)
            return res.status(400).json({status: 'error', msg: 'hello', error})
        }
    }

    async login (req: express.Request, res: express.Response) {
        try {

            const { email, password } = req.body

            const user = await UserModel.findOne({email})

            if(!user) {
                return res.status(400).json({status: 'error', message: 'Пользователь не найден!'})
            }

            // console.log(password, user?.password)

            const isValidPassword = bcrypt.compareSync(password, user?.password)

            if(!isValidPassword){
                return res.status(400).json({message: "Неверный пароль"})
            }

            const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'})

            return res.json({
                status: "successsss",
                token,
                user: {
                    id: user?._id,
                    email: user?.email
                }
            })
    
            
        } catch (error) {
            console.log(error)
            return res.status(400).json({status: 'error', message: error})
        }
    }

    async auth (req: express.Request, res: express.Response) {
        try {
            // console.log(req.user.id, 'sssssssssss')
            //@ts-ignore
            const user = await UserModel.findOne({_id: req.user.id})

            const token = jwt.sign({id: user?._id}, process.env.SECRET_KEY, {expiresIn: '1h'})

            return res.json({
                token,
                user: {
                    id: user?.id,
                    email: user?.email,
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({status: 'error', message: error})
        }
    }
}

export const UserCtrl= new UserController()
import express from 'express'
import dotenv from 'dotenv'
const cors = require('cors')
const corsMiddleware = require('./middleware/cors.middleware')
const authMiddleware = require('./middleware/auth.middleware')
const fileuploader = require('express-fileupload')
// import './core/db'
import { UserCtrl } from './controllers/UserController'
import mongoose, { ConnectOptions } from 'mongoose'
import { OptionCtrl } from './controllers/OptionsController'
import { CategoryCtrl } from './controllers/CategoryController'
import { AdCtrl } from './controllers/AdController'
dotenv.config()
const app = express()

mongoose.set('strictQuery', true);
app.use(fileuploader())

app.use(cors())
// app.use(corsMiddleware)
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
//     next();
// })

app.use(express.json())


app.get('/home', UserCtrl.index)

app.post('/register', UserCtrl.register)
app.get('/auth', authMiddleware,  UserCtrl.auth)
app.post('/login', UserCtrl.login)

// Options routes
app.post('/create_option', OptionCtrl.createOption)
app.get('/get_all_options', OptionCtrl.getAllOptions)

//  Categories routes
app.post('/create_category', CategoryCtrl.createCategory)
app.get('/get_all_categories', CategoryCtrl.getAllCategories)
app.post('/get_category', CategoryCtrl.getCategory)

// Ads routes
app.get('/get_all_ads', AdCtrl.getAllAds)
app.post('/create_new_ad', AdCtrl.createAd)
app.delete('/deleteAd/:id', AdCtrl.deleteAd)
// app.get('/getAd/:id', AdCtrl.getAd)
app.get('/getAd/:id', AdCtrl.getAd)
app.post('/getUserAds', AdCtrl.getUserAds)
app.post('/deactivateAd', AdCtrl.deactivateAd)
app.post('/activateAd', AdCtrl.activateAd)

const start = async () => {
    try {

        await mongoose.connect('mongodb://localhost:27017/olx_clone',{
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useUifiedTopology: true,
            // useFindAndModify: false
        } as ConnectOptions)

        app.listen(8888, () => {
            console.log('server runned on port - ', 8888)
        })
    } catch (error) {
        console.log(error)
    }
}

// app.listen(8888, () => {
//     console.log('server run!')
// })

start()




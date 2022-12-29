import express from 'express'
import dotenv from 'dotenv'
const corsMiddleware = require('./middleware/cors.middleware')
const authMiddleware = require('./middleware/auth.middleware')
// import './core/db'
import { UserCtrl } from './controllers/UserController'
import mongoose, { ConnectOptions } from 'mongoose'
dotenv.config()
const app = express()

mongoose.set('strictQuery', true);

// app.use(corsMiddleware)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
    next();
})
app.use(express.json())


app.get('/home', UserCtrl.index)

app.post('/register', UserCtrl.register)
app.get('/auth', authMiddleware,  UserCtrl.auth)
app.post('/login', UserCtrl.login)

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

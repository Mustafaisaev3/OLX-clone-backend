const jwt = require('jsonwebtoken')


module.exports = (req: any, res: any, next: any) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded, 'token', token)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({message: 'Auth errorrr'})
    }
}
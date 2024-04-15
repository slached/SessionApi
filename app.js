require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const session = require('express-session')
const MongoStore = require('connect-mongo')
const bcrypt = require('bcrypt')

const User = require('./models/User.js')

//middlewares
app.use(require('cors')())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(require('cookie-parser')())

//session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    cookie: {
        httpOnly: true,
        secure: false,
    }

}))

//db connection
require('mongoose').connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`App is running on port ${port}`)
        })
    })
    .catch(err => console.log(err))

app.post('/register', async (req, res) => {
    try {
        const newUser = new User({username: req.body.username, password: await bcrypt.hash(req.body.password, 10)})
        await newUser.save()
        res.status(200).json({message: `${req.body.username} created successfully.`})
    } catch (err) {
        err.code === 11000 && res.status(400).json({message: "User already exists."})
    }
})

app.get('/get', require('./middlewares/Auth.js').checkSession, async (req, res) => {
    try {
        const users = await User.find(undefined, undefined, undefined)
        res.status(200).json({users: users})
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})

app.post('/login', require('./middlewares/isLoggedIn.js').loggedIn, async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username: username})
        if (!user) return res.status(404).json({message: "User could not founded!"})
        const passwordVerification = await bcrypt.compare(password, user.password)
        if (passwordVerification) {
            req.session.isAuthenticated = true
            req.session.user = user

            res.status(200).json({message: "Login success."})
        } else {
            res.status(401).json({message: "Password is incorrect"})
        }
    } catch (err) {
        res.status(400).json({message: err})
    }
})

app.post('/logout', require('./middlewares/isLoggedIn').loggedOut, async (req, res) => {
    try {
        await req.session.destroy(() => {
            res.clearCookie('connect.sid')
            res.status(200).json({message: "Logout successful."})
        })

    } catch (err) {
        res.status(400).json({message: "Logout is not successful"})

    }
})
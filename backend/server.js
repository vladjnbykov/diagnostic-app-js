/* eslint-disable linebreak-style */
// import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

// dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/diagnostisDiabetes"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

// MongoDB collection for set of symptoms
const Symptom = mongoose.model('Symptom', {
    message: String
})

// MongoDB collection for users

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString('hex')
    }
})

const authenticateUser = async (req, res, next) => {
    const accessToken = req.header('Authorization')

    try {
        const user = await User.findOne({ accessToken })
        if (user) {
            next()
        } else {
            res.status(401).json({ message: "Not authenticated" })
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid request", error })

    }
}

const port = process.env.PORT || 8080
const app = express()

// Middleware

app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/symptoms', authenticateUser)
app.get('/symptoms', async (req, res) => {
    const symptoms = await Symptom.find()
    res.json(symptoms)
})

app.post('/symptoms', authenticateUser)
app.post('/symptoms', async (req, res) => {
    const { message } = req.body

    try {
        const newSymptom = await new Symptom({ message }).save()
        res.json(newSymptom)

    } catch (error) {
        res.status(400).json({ message: "Invalid request", error })
    }

})

app.post('/signup', async (req, res) => {
    const { username, password } = req.body

    try {
        const salt = bcrypt.genSaltSync()

        const newUser = await new User({
            username,
            password: bcrypt.hashSync(password, salt)
        }).save()

        res.json({
            success: true,
            userID: newUser._id,
            username: newUser.username,
            accessToken: newUser.accessToken
        })
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid request', error })

    }
})

app.post('/signin', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })

        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({
                success: true,
                userID: user._id,
                username: user.username,
                accessToken: user.accessToken
            })
        } else {
            res.status(404).json({ success: false, message: "User not found" })

        }
    } catch (error) {
        res.status(400).json({ success: false,  message: "Invalid request", error })
    }
})

// Start the server
app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server running on http://localhost:${port}`)
  })
  
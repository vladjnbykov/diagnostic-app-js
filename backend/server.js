/* eslint-disable linebreak-style */
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/diagnostisDiabetes"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

// MongoDB collection for set of symptoms
const Symptom = mongoose.model('Symptom', {
    username: {
        type: String,
        required: true,
        unique: true
    },


    age: { 
        type: Number,
        required: true
    },
    gender: String,
    checkedItems: {},
    items: {},
    risk: Number,
    parameters: {}

    

    
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
    role: {
        type: String,
        default: "user"
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

app.get('/symptoms', authenticateUser)
app.get('/symptoms', async (req, res) => {
    const symptoms = await Symptom.find()
    res.json(symptoms)
})

app.post('/symptoms', authenticateUser)
app.post('/symptoms', async (req, res) => {
    const { username, age, gender, risk, items, polyuria, polydipsia, weakness, genital_thrush, itching, irritability, delayed_healing, alopecia, obesity, checkedItems, parameters } = req.body

    try {
        const newSymptom = await new Symptom({ 
            username, 
            age, 
            gender,
            risk, 
            items,
            polyuria, 
            polydipsia, 
            weakness, 
            genital_thrush, 
            itching, 
            irritability, 
            delayed_healing, 
            alopecia, 
            obesity,
            checkedItems,
            parameters
         }).save()
        res.json(newSymptom)

    } catch (error) {
        res.status(400).json({ message: "Invalid request", error })
    }

})

// PATCH
app.patch('/symptoms/:id', async (req, res) => {
    const { id } = req.params

    try {
        const updatedSymptom = await Symptom.findByIdAndUpdate(id, { risk: req.body.risk }, { new: true })
        if (updatedSymptom) {
            res.json(updatedSymptom)
        } else {
            res.status(404).json({ message: 'Not found' })
        }

    } catch (error) {
        res.status(400).json({ message: 'Invalid request', error })
    }

})



app.post('/signup', async (req, res) => {
    const { username, role, password } = req.body

    try {
        const salt = bcrypt.genSaltSync()

        const newUser = await new User({
            username,
            password: bcrypt.hashSync(password, salt),
            role
        }).save()

        res.json({
            success: true,
            userID: newUser._id,
            username: newUser.username,
            role: newUser.role,
            accessToken: newUser.accessToken
        })
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid request', error })

    }
})

app.post('/signin', async (req, res) => {
    const { username, role, password } = req.body

    try {
        const user = await User.findOne({ username })

        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({
                success: true,
                userID: user._id,
                username: user.username,
                role: user.role,
                accessToken: user.accessToken
            })
        } else {
            res.status(404).json({ success: false, message: "User not found. Please set up account" })

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
  
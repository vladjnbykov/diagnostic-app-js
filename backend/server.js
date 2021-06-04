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

const Symptom = mongoose.model('Symptom', {
    message: String
})


const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/symptoms', async (req, res) => {
    const symptoms = await Symptom.find()
    res.json(symptoms)
})

app.post('/symptoms', async (req, res) => {
    const { message } = req.body

    try {
        const newSymptom = await new Symptom({ message }).save()
        res.json(newSymptom)

    } catch (error) {
        res.status(400).json({ message: "Invalid request", error })
    }

})


// Start the server
app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server running on http://localhost:${port}`)
  })
  
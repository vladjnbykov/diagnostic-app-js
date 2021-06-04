/* eslint-disable linebreak-style */
// import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

// dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise
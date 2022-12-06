import express from 'express'
import * as dotenv from 'dotenv'
import dbConnect from './config/db.config.js'

dotenv.config()

dbConnect()

const app = express()
app.use(express.json())

app.listen(Number(process.env.PORT),
    () => console.log(`server on port ${process.env.PORT}!'`))
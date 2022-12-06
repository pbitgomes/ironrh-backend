import express from 'express'
import * as dotenv from 'dotenv'
import dbConnect from './config/db.config.js'
import userRouter from './routes/user.routes.js'

dotenv.config()

dbConnect()

const app = express()
app.use(express.json())

// 8080/user/register
app.use('/user', userRouter)

app.listen(Number(process.env.PORT),
    () => console.log(`server on port ${process.env.PORT}!'`))
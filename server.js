import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoute.js'

//Configure dotenv files above using any other library and files
dotenv.config()
//Creating an app from express
connectDB()

const app = express()

//Using express.json to get request of json data
app.use(express.json())

//Using routes
app.use('/api/users', userRoutes)

//listening to the server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening at ${process.env.PORT}`)
})

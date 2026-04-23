import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
//to fix db not connected error
import dns from 'dns'
import showRouter from './routes/showRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/userRoutes.js'

//Changing dns
dns.setServers(['1.1.1.1', '8.8.8.8']);


const app = express()
const port =3000

await connectDB()

//Middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

app.use(cors({
    origin: 'https://online-movie-ticket-booking-4242.vercel.app', // No trailing slash!
    credentials: true
}));

//API routes
app.get('/', (req,res)=> res.send('Server is Live'))
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/show', showRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.listen(port, ()=> console.log(`Server is Listening at http://localhost:${port}`))
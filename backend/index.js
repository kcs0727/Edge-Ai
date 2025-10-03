import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import { clerkMiddleware, requireAuth } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';

import aiRouter from './routes/airoutes.js';
import userRouter from './routes/userroutes.js';


const app = express();
const port = process.env.PORT;
await connectCloudinary();


const corsOptions={
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}
app.use(cors(corsOptions));
app.options(/.*/,cors(corsOptions));


app.use(express.json());
app.use(clerkMiddleware());


app.get('/', (req, res) => {
  res.send('Server is Working!..')
})
app.use(requireAuth());
app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
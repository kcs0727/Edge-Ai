import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import { clerkMiddleware, requireAuth } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';

import aiRouter from './routes/airoutes.js';
import userRouter from './routes/userroutes.js';


const app = express();
const port = process.env.PORT ||3000;
await connectCloudinary();


app.use(cors({
  origin: ['https://edge-ai-frontend.vercel.app','http://localhost:5173'],
  credentials: true
}));


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server is Working!..')
})

app.use(clerkMiddleware());
app.use(requireAuth());
app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
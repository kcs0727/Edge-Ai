import express from 'express';
import { auth } from '../middlewares/auth.js';
import { getPublishedCreations, getUserCreations, toogleLikeCreations } from '../controllers/usercontrollers.js';


const userRouter= express.Router();

userRouter.get('/get-user-creations', auth, getUserCreations);

userRouter.get('/get-published-creations',auth, getPublishedCreations);

userRouter.post('/toogle-liked-creations',auth, toogleLikeCreations);

export default userRouter;
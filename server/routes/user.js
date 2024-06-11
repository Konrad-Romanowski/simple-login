import express from 'express';
import { getUser } from '../controllers/user/getUser.js';
import { updateUser } from '../controllers/user/updateUser.js';

export const userRoute = express.Router();

userRoute.get("/:id",getUser);
userRoute.put("/:id",updateUser);
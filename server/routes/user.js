import express from 'express';
import { getUser } from '../controllers/user/getUser.js';

export const userRoute = express.Router();

userRoute.get("/:id",getUser);
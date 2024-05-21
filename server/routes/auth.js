import express from 'express';
import { createUser } from '../controllers/register.js';
import { login } from '../controllers/login.js';
import { logout } from '../controllers/logout.js';
import { verifyUser } from '../controllers/verify.js';

export const authRoute = express.Router();

authRoute.post('/register',createUser);
authRoute.post('/login',login);
authRoute.post('/logout',logout);
authRoute.get('/verify',verifyUser);
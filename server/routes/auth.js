import express from 'express';
import { createUser } from '../controllers/auth/register.js';
import { login } from '../controllers/auth/login.js';
import { logout } from '../controllers/auth/logout.js';
import { verifyUser } from '../controllers/auth/verify.js';

export const authRoute = express.Router();

authRoute.post('/register',createUser);
authRoute.post('/login',login);
authRoute.post('/logout',logout);
authRoute.get('/verify',verifyUser);
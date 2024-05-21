import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRoute } from './routes/auth.js';
import { userRoute } from './routes/user.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));

app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import {db} from '../../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function login(req,res) {
    const {username,password} = req.body;

    const q = 'SELECT * FROM users WHERE `username` = ?'
    db.query(q,[username],(err,data) => {
        if(err) return res.status(500).json({success: false, message: err.message});

        if(!data.length) return res.status(401).json({success: false, message: "Wrong username or password."});
        bcrypt.compare(password,data[0].password,(err,comparisonResult)=>{
            if(err) return res.status(500).json({success: false, message: err.message});
            if(!comparisonResult) return res.status(401).json({success: false, message: "Wrong username or password."});

            const userData = {
                id: data[0].user_id,
                username: data[0].username,
                email: data[0].email,
                profilePic: data[0].profile_pic,
            }
            // CREATE AND SEND TOKEN
            const accessToken = jwt.sign(userData,process.env.ACCESS_TOKEN_SECRET_KEY || "YOUR_SECRET_KEY_HERE");
            res.cookie(
                'simple-login-access-cookie',
                accessToken,
                {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 100
                }
            ).status(200).json({success: true, message: "Logged in!", user: userData});
        });
    })
}
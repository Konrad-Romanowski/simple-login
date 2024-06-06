import { db } from "../../db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function updateUser(req,res) {
    const {id, username, email,profilePic} = req.body;

    const q = 'SELECT * FROM `users` WHERE `username` = ? OR `email` = ? AND user_id != ?'
    db.query(q,[username,email,id],(err,data) => {
        if(err) return res.status(500).json({success: false, message: err.message});
        
        const usersWithSameUsername = data.filter(u => u.username === username)
        if(usersWithSameUsername.length > 0) return res.status(409).json({success: false, message: "Username already taken."});
        const usersWithSameEmail = data.filter(u => u.email === email)
        if(usersWithSameEmail.length > 0) return res.status(409).json({success: false, message: "Email already taken."});

        const q = 'UPDATE `simple-login`.users SET username = ?, email = ?, profile_pic = ? WHERE user_id = ?' 
        db.query(q, [username, email, profilePic, id], err => {
            if(err) res.status(500).json({success: false, message: err.message});
            const accessToken = jwt.sign(
                {id, username, email, profilePic},
                process.env.ACCESS_TOKEN_SECRET_KEY || "YOUR_SECRET_KEY_HERE",    
            )
            res.cookie(
                'simple-login-access-cookie',
                accessToken,
                {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 100
                }
            ).status(200).json({success: true, message: "User has been updated.", user: {id, username, email, profilePic}});
        });
    });
}
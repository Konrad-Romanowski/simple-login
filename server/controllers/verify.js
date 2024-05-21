import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function verifyUser(req,res) {
    
    const token = req.cookies['simple-login-access-cookie'];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,data)=>{
        if(err) return res.status(401).send({success: false, message: "User unauthorize."});
        const q = 'SELECT * FROM users WHERE `user_id` = ?'
        db.query(q,[data.id],(err,userData) => {
            if(err) return res.status(500).send({success: false, message: err.message});
            if(userData.length === 0) return res.status(401).send({success: false, message: "User unauthorize."});
            return res.status(200).json({success: true, message: "User authorized."})
        });
    })
    
    // res.json({message: "hello from verify"});
}
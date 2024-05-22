import { db } from "../../db.js";
import bcrypt from "bcryptjs";

export function createUser(req,res) {
    const {username, email, password} = req.body;

    const q = 'SELECT * FROM users WHERE `username` = ? OR `email` = ?'
    db.query(q,[username,email],(err,data) => {
        if(err) return res.status(500).json({success: false, message: err.message});
        const registeredUser = data.filter(u => u.username === username);
        if(registeredUser.length) return res.status(409).json({success: false, message: 'User already exists!'});
        const registeredEmail = data.filter(u => u.email === email);
        if(registeredEmail.length) return res.status(409).json({success: false, message: 'Email already taken!'});
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt);
        
        const q = 'INSERT INTO users (`username`,`email`,`password`) VALUES (?)'
        const values = [username, email, hashedPassword];
               
        db.query(q,[values],(err,data)=>{
            if(err) {
                console.log(err)
            } else {
                return res.status(200).json({success: true, message: 'User has been created!'});
            }
        });
        return res.status(200).json({success: true, message: 'User has been created!'});
    });
}
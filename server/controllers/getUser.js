import { db } from "../db.js";

export function getUser(req,res) {
    const q = 'SELECT * FROM users WHERE user_id = ?';
    db.query(q,[req.params.id],(err,data) => {
        if(err) return res.status(409).json({success: false, message: err.message});
        if(data.length === 0) return res.status(404).json({success: false, message: 'User not found.'});

        const userData = {
            id: data[0].user_id,
            username: data[0].username,
            email: data[0].email,
            profilePic: data[0].profile_pic,
        }

        return res.status(200).json({success: true, message: 'Success', user: userData});
    });
}
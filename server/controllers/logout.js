import dotenv from "dotenv";
dotenv.config();

export function logout(req,res) {
    res.clearCookie('simple-login-access-cookie',{
        sameSite: 'none',
        secure: true
    }).status(200).json({success:true, message:"Logged out successfully!"})
}
import {redirect} from 'react-router-dom';

export default async function requireAuth() {
    try {
        const response = await fetch('http://localhost:3000/auth/verify',{
            method: 'GET',
            credentials: 'include'
        });
        const verification = await response.json();
        if(!verification.success) {
            return redirect("/login");
        }
        return verification.success;
    } catch(err) {
        throw new Error(err);
    }
}
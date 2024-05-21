import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

export default function Navbar({user,setUser}) {
    const navigate = useNavigate();

    async function handleClick() {
        try {
            const response = await fetch('http://localhost:3000/auth/logout',{
               method: 'POST',
               headers: {
                'Content-Type': 'application/json'
               },
               body: JSON.stringify(user),
               credentials: 'include'
            });
            const data = await response.json();
            if(data.success) {
                localStorage.removeItem("#simple-login-user");
                setUser(null);
                navigate('/')
            }
        } catch(err) {
            throw Error(err);
        }
    }

    return (
        <nav className='navbar'>
            <div className='navbar-item'>
                <NavLink to="/">Home</NavLink>
            </div>
            <div className='navbar-item'>
                <NavLink to="/protected">Protected</NavLink>
            </div>
            <div className='navbar-item'>
                {user ? 
                    <NavLink to={`/user/${user.id}`}>{user.username}</NavLink>:
                    <NavLink to="/register">Register</NavLink>
                }
            </div>
            <div className='navbar-item'>
                {user ?
                    <button onClick={handleClick}>Logout</button> :
                    <NavLink to="/login">Login</NavLink>
                }
            </div>
        </nav>
    )
}
import React from 'react';
import {useOutletContext} from 'react-router-dom';


export default function UpdateUserModal({isModalOn, setIsModalOn}) {
    const user = useOutletContext();
    const [updatedUser,setUpdatedUser] = React.useState(user);
    const [apiResponse,setApiResponse] = React.useState({success: false, message: ""});
    const modalStyle = {
        display: isModalOn ? "block" : "none"
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/user/${user.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });
            const data = await response.json();
            if(!data.success) {
                return setApiResponse(data);
            }
            localStorage.setItem("#simple-login-user",JSON.stringify(data.user));
            setIsModalOn(false);
            // REFRESH THE PAGE TO REFLECT UPDATED DATA
        } catch(err) {
            throw Error(err);
        }
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setUpdatedUser(prevState => ({...prevState, [name]: value}))
    }
    
    return (
        <section className='update-user-container' style={modalStyle} >
            <button className='close-button' onClick={()=>setIsModalOn(false)}>X</button>
            <form onSubmit={handleSubmit} method='PUT'>
                <input 
                    type="text"
                    placeholder='Enter new username...'
                    name="username"
                    value={updatedUser.username}
                    onChange={handleChange}
                />
                <input 
                    type="email"
                    placeholder='Enter new email...'
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                />
                <p className={`form-alert ${apiResponse?.success ? "green" : null}`}>{apiResponse?.message}</p>
                <button className='update-user-button'>Update</button>
            </form>
        </section>
    )
}

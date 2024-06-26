import React from 'react';
import {useOutletContext} from 'react-router-dom';


export default function UpdateUserModal({isModalOn, setIsModalOn}) {
    const userContext = useOutletContext();
    const [updatedUser,setUpdatedUser] = React.useState(userContext.user);
    const [apiResponse,setApiResponse] = React.useState({success: false, message: ""});
    const modalStyle = {
        display: isModalOn ? "block" : "none"
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/user/${userContext.user.id}`,{
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
            userContext.setUser(data.user);
        } catch(err) {
            throw Error(err);
        }
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setUpdatedUser(prevState => ({...prevState, [name]: value}))
    }

    function handleCloseButton() {
        setIsModalOn(false);
        setUpdatedUser(userContext.user);
    }
    
    return (
        <section className='update-user-container' style={modalStyle} >
            <button className='close-button' onClick={handleCloseButton}>X</button>
            <form onSubmit={handleSubmit} method='PUT'>
                <div className="form-item">
                    <label htmlFor="update-user-username">Username</label>
                    <input
                        id="update-user-username"
                        type="text"
                        placeholder='Enter new username...'
                        name="username"
                        value={updatedUser?.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor="update-user-email">Email</label>
                    <input 
                        id="update-user-email"
                        type="email"
                        placeholder='Enter new email...'
                        name="email"
                        value={updatedUser?.email}
                        onChange={handleChange}
                    />
                </div>
                <p className={`form-alert ${apiResponse?.success ? "green" : null}`}>{apiResponse?.message}</p>
                <button className='update-user-button'>Update</button>
            </form>
        </section>
    )
}

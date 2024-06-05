import React from 'react';
import {useOutletContext} from 'react-router-dom';


export default function UpdateUserModal({isModalOn, setIsModalOn}) {
    const user = useOutletContext();
    const [updatedUser,setUpdatedUser] = React.useState(user)
    const modalStyle = {
        display: isModalOn ? "block" : "none"
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
    
        } catch(err) {
            
        }
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setUpdatedUser(prevState => ({...prevState, [name]: value}))
    }
    
    return (
        <section className='update-user-container' style={modalStyle} >
            <button className='close-button' onClick={()=>setIsModalOn(false)}>X</button>
            <form method="POST" onSubmit={handleSubmit}>
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
                <button className='update-user-button'>Update</button>
            </form>
        </section>
    )
}

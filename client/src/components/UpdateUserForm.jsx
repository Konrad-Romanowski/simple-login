import React from 'react';
import {Form , useOutletContext} from 'react-router-dom';

function handleSubmit(e) {
    e.preventDefault();
}

export default function UpdateUserForm({isModalOn, setIsModalOn}) {
    const user = useOutletContext();

    const modalStyle = {
        display: isModalOn ? "block" : "none"
    }
    
    return (
        <section className='update-user' style={modalStyle} >
            <button className='close-button' onClick={()=>setIsModalOn(false)}>X</button>
            <form method="POST" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="new-username">New username:</label>
                    <input id='new-username' type="text" placeholder='Enter new username...' name="new-username" />
                </div>
                <div>
                    <label htmlFor="new-email">New email:</label>
                    <input id='new-email' type="email" placeholder='Enter new email...' name="new-email" />
                </div>
                <button>Update</button>
            </form>
        </section>
    )
}

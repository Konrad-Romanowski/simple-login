import React from 'react';
import { Await, defer, useLoaderData, useOutletContext } from "react-router-dom";
import UpdateUserForm from '../components/UpdateUserModal';

export async function loader({params}) {
    try {
        const response = await fetch(`http://localhost:3000/user/${params.id}`);
        const data = response.json();
        return defer({user: data});
    } catch(err) {
        throw new Error(err);
    }
}

export default function User() {
    const userContext = useOutletContext();
    const loaderData = useLoaderData();    
    const [isModalOn,setIsModalOn] = React.useState(false);
    
    function renderContent(loadedUser) {
        const user = loadedUser.user;
        if(!loadedUser.success) {
            return <section><h2>User not found!</h2></section>
        }
        return (
            <>
                <section className='user-container'>
                    {userContext.user?.id === user.id ? 
                        <h1>Hello {userContext.user?.username}!</h1> : 
                        <h1>{user.username}</h1>
                    }
                    <section className='profile'>
                        <div className='profile-item'><b>Username: </b><span>{user.username}</span></div>
                        {userContext.user?.id === user.id && <div className='profile-item'><b>Email: </b><span>{userContext.user.email}</span></div>}
                        <div className='profile-item'><b>Profile picture: </b><span>{user.profilePic}</span></div>
                    </section>
                    {userContext.user?.id === user.id && <button onClick={()=>setIsModalOn(true)}>Edit profile</button>}
                </section>
                <UpdateUserForm isModalOn={isModalOn} setIsModalOn={setIsModalOn} />  
            </>
        )
    }
    
    return (
        <div className="wrapper-normal-flow">
            <React.Suspense fallback={<div>Loading data...</div>}>
                <Await resolve={loaderData.user}>
                    {renderContent}
                </Await>
            </React.Suspense>
        </div>
    )
}
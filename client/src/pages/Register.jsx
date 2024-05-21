import React from 'react';
import {Link, Form, useActionData} from 'react-router-dom';

export async function action({request}) {
    const formData = await request.formData();
    const userData = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    }

    try{
        const response = await fetch('http://localhost:3000/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        return data;
    } catch(err) {
        throw Error(err);
    }
}

export default function Register() {
    const actionData = useActionData();

    return (
        <div className='wrapper'>
            <section className='register-container'>
                <h1>Register</h1>
                <p>
                    <Link to="/">
                        &#8592; <span>back to Home</span>
                    </Link>
                </p>
                <Form method='POST'>
                    <input required type="text" name="username" placeholder="Enter username..." />
                    <input required type="email" name="email" placeholder="Enter email..." />
                    <input required type="password" name="password" placeholder="Enter password..." />
                    <p className={`form-alert ${actionData?.success ? "green" : null}`}>{actionData?.message}</p>
                    <p className="form-info">Have an account already? Go to <Link to="/login">login</Link> page.</p>
                    <button type="submit">Create account</button>
                </Form>
            </section>
        </div>
    )
}
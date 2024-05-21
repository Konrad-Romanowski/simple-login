import {Form, Link, redirect, useActionData} from 'react-router-dom';

export async function action({request}) {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        if(data.success) {
            localStorage.setItem("#simple-login-user",JSON.stringify(data.user));
            return redirect("/");
        }
        return data;
    } catch(err) {
        throw Error(err);
    }
}

export default function Login() {
    const actionData = useActionData();

    return (
        <div className="wrapper">
            <section className='login-container'>
                <h1>Login</h1>
                <p>
                    <Link to="/">
                        &#8592; <span>back to Home</span>
                    </Link>
                </p>
                <Form method="post" replace>
                    <input required name="username" type="text" placeholder="Enter username..."/>
                    <input required name="password" type="password" placeholder="Enter password..."/>
                    <p className='form-alert'>{actionData?.message}</p>
                    <p className="form-info">Don't have an account yet? <br /> Go to <Link to="/register">register</Link> page.</p>
                    <button>Login</button>
                </Form>
            </section>
        </div>
    )
}
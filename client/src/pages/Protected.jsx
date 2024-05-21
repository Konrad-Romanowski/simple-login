import React from 'react'

export default function Protected() {
    return (
        <div className="wrapper-normal-flow">
            <section className="protected-container">
                <h1>Protected route.</h1>
                <p>This route is protected. It can be only accessed by users that are logged in. If you can read this message it means that you are logged in! Users that aren't logged in are redirected immediately to login page.</p>
            </section>
        </div>
    )
}

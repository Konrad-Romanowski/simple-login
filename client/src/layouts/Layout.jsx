import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

export function loader() {
    const user = JSON.parse(localStorage.getItem("#simple-login-user")) || null;
    return user;
}

export default function Layout() {
    const [user, setUser] = useState(useLoaderData());

    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <Outlet context={user}/>
        </>
    )
}
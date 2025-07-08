import {Navbar} from "./Navbar.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function Layout() {

    const user = sessionStorage.getItem("User")
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}
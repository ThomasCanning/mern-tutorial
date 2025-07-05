import {Navbar} from "./Navbar.tsx";
import {Outlet} from "react-router-dom";

export function Layout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}
import {useState} from 'react';
import * as React from "react";
import type User from "../../../../types/user";
import {verifyUser} from "@/services/api.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await verifyUser(user)
        if (response.success) {
            sessionStorage.setItem("User", response.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
            navigate("/home")
        } else{
            alert("Login failed: " + response.message);
        }
    }

    return (
        <form onSubmit = {handleSubmit}>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={254}/>
            <input placeholder={"Password"} onChange={handleChange} name="password" required maxLength={128} type="password "/>
            <button type="submit">Login</button>
        </form>

    );
};

export default Login;
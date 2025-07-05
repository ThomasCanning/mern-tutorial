import {useState} from 'react';
import * as React from "react";
import {createUser} from "@/services/api.ts";
import type User from "../../../../types/user";

const CreateUser = () => {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
    })

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await createUser(user)
        if (response.status !== 200) {
            alert("User account could not be created")
        }
    }

    return (
        <form onSubmit = {handleSubmit}>
            <input placeholder="Name" onChange={handleChange} name="name" required maxLength={50}/>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={254}/>
            <input placeholder={"Password"} onChange={handleChange} name="password" required maxLength={128} type="password "/>
            <button type="submit">Create Account</button>
        </form>

    );
};

export default CreateUser;
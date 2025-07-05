import type Post from "../post"

export default interface User {
    name: string;
    email: string
    password: string;
    joinDate?: Date;
    posts?: Post[]
}

export type LoginResponse =
    | { success: true; token: string }
    | { success: false; message: string }
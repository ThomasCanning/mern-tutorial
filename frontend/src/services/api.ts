import axios, {type AxiosResponse} from "axios";
import type Post from "../../types/post"
import type User from "../../types/user";
import type { LoginResponse } from "../../types/user";

const URL = "http://localhost:3000";

export async function getPosts(): Promise<Post[]> {
    const response = await axios.get<Post[]>(`${URL}/posts/`);
    return response.data;
}

export async function getPost(id: string): Promise<Post> {
    const response = await axios.get<Post>(`${URL}/posts/${id}`);
    return response.data;
}

export async function createPost(post: Post): Promise<AxiosResponse<Post>> {
    return await axios.post<Post>(`${URL}/posts/`, post);
}

export async function updatePost(id: string, post: Post): Promise<AxiosResponse<Post>> {
    return await axios.put<Post>(`${URL}/posts/${id}`, post);
}

export async function deletePost(id: string): Promise<void> {
    await axios.delete(`${URL}/posts/${id}`);
}

export async function getUser(id: string): Promise<User> {
    const response = await axios.get<User>(`${URL}/users/${id}`);
    return response.data;
}

export async function createUser(user: User): Promise<AxiosResponse<User>> {
    return await axios.post<User>(`${URL}/users/`, user);
}

export async function updateUser(id: string, user: User): Promise<AxiosResponse<User>> {
    return await axios.put<User>(`${URL}/users/${id}`, user);
}

export async function verifyUser(user: User): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`${URL}/users/login`, user);
    return response.data
}
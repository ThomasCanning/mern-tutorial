import '../../../App.css'
import {useEffect, useState} from "react";
import type Post from "../../../../types/post";
import type User from "../../../../types/user";
import {getPosts} from "@/services/api.ts";
import {BlogCard} from "@/features/blog/components/BlogCard.tsx";
import {jwtDecode} from "jwt-decode";

function Profile() {

    //create use state for post and user
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function loadUserData() {
            const token = sessionStorage.getItem("User");
            if (!token) {
                console.error("No token found");
                return;
            }
            const decodedUser = jwtDecode(token) as User;

            if (!decodedUser) {
                console.error("Invalid token");
                return;
            }
            const allPosts = await getPosts();
            const filteredPosts = allPosts.filter((post) => post.author === decodedUser._id);
            setPosts(filteredPosts)
            setUser(decodedUser)
        }
        loadUserData()
    }, []);

    return (
        <>
            <label>Name:</label>
            <h2>{user?.name}</h2>
            <label>Email:</label>
            <h2>{user?.email}</h2>
            <label>Join Date:</label>
            <h2>{user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}</h2>
            {posts.map((post) => {
                return (
                    <BlogCard post={post}/>
                )
            })}
        </>

    )
}

export default Profile

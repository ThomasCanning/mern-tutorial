import { useState, useEffect } from "react"
import {getPosts} from "@/services/api.ts";
import type Post from "../../../../types/post"
import {BlogCard} from "@/features/blog/components/BlogCard.tsx";


export default function Home() {

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        async function loadAllPosts() {
            const data = await getPosts()
            data.sort((d1, d2) => new Date(d2.dateCreated).getTime() - new Date(d1.dateCreated).getTime())
            setPosts(data)
        }
        loadAllPosts().catch(console.error);
    }, [])

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-1/3 mt-4">
                {posts.map((post) => {
                    return (
                        <BlogCard key={post._id} post={post}/>
                    )
                })}
            </div>
        </div>
    )
}
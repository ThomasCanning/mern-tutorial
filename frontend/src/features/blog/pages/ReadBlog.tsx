import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type Post from "../../../../types/post"
import { getPost } from "@/services/api"

export function ReadBlog() {
    const [post, setPost] = useState<Post>()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return;

        async function loadPost() {
            const data = await getPost(id!);
            setPost(data);
        }

        loadPost().catch(console.error);
    }, [id]);


    if (!post) return null

    const formattedDate = new Date(post.dateCreated).toDateString()

    return (
        <div className="flex flex-col items-center w-1/3">
            <Button onClick={() => navigate(-1)} className="w-48 my-4">
                Back
            </Button>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">
                {post.title}
            </h1>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
                {post.description}
            </h2>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {formattedDate}
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
                {post.content}
            </p>
        </div>
    )
}

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {createPost} from "@/services/api.ts";
import * as React from "react";

export default function CreateBlog() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let submitObject = {
            title: title,
            description: description,
            content: content,
            author: "",
            dateCreated: new Date().toISOString(),
        }

        await createPost(submitObject)
    }

    return (
        <form onSubmit={handleSubmit} className="w-1/3">
            <Label className="flex left-0 p-2">Blog Post Title: </Label>
            <Input onChange={(e) => setTitle(e.target.value)} maxLength={100} required name="title"/>
            <Label className="flex left-0 p-2">Blog Description: </Label>
            <Input onChange={(e) => setDescription(e.target.value)} maxLength={200} required name="description"/>
            <Label className="flex left-0 p-2">Blog Content: </Label>
            <Textarea onChange={(e) => setContent(e.target.value)} maxLength={5000} required name="content"/>
            <Button type="submit" className="mt-4">Submit</Button>
        </form>
    )
}
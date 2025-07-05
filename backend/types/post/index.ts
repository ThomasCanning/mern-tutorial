import {ObjectId} from "mongodb";

export default interface Post {
    title: string;
    description: string;
    content: string;
    author: string;
    dateCreated: string;
    _id?: ObjectId;
}
import express from "express";
import { getDb } from './connect.js';
import { ObjectId } from 'mongodb';
import jwt from "jsonwebtoken";
import { JWT_KEY } from "./secrets.js";
const postRoutes = express.Router();
postRoutes.route("/posts").get(verifyToken, async (request, response) => {
    let db = getDb();
    let data = await db.collection("posts").find({}).toArray();
    if (data.length > 0) {
        response.json(data);
    }
    else {
        throw new Error("Data was not found");
    }
});
postRoutes.route("/posts/:id").get(verifyToken, async (request, response) => {
    const db = getDb();
    const data = await db.collection("posts").findOne({ _id: new ObjectId(request.params.id) });
    if (data) {
        response.json(data);
    }
    else {
        throw new Error("Data was not found");
    }
});
postRoutes.route("/posts").post(verifyToken, async (request, response) => {
    const db = getDb();
    const mongoObject = {
        title: request.body.title,
        description: request.body.description,
        content: request.body.content,
        author: request.body.author,
        dateCreated: request.body.dateCreated
    };
    const data = await db.collection("posts").insertOne(mongoObject);
    response.json(data);
});
postRoutes.route("/posts/:id").put(verifyToken, async (request, response) => {
    const db = getDb();
    const mongoObject = {
        $set: {
            title: request.body.title,
            description: request.body.description,
            content: request.body.content,
            author: request.body.author,
            dateCreated: request.body.dateCreated
        }
    };
    const data = await db.collection("posts").updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
    response.json(data);
});
postRoutes.route("/posts/:id").delete(verifyToken, async (request, response) => {
    let db = getDb();
    let data = await db.collection("posts").deleteOne({ _id: new ObjectId(request.params.id) });
    response.json(data);
});
function verifyToken(request, response, next) {
    const authHeaders = request.headers["authorization"];
    if (!authHeaders) {
        response.status(401).json({ message: "Authorization token is missing" });
        return;
    }
    const token = authHeaders && authHeaders.split(" ")[1];
    if (!token) {
        response.sendStatus(401).json({ message: "Authorization token is missing" });
        return;
    }
    if (!JWT_KEY) {
        throw new Error('Missing JWT_KEY in environment variables');
    }
    jwt.verify(token, JWT_KEY, (error, user) => {
        if (error) {
            response.sendStatus(403).json({ message: "Invalid token" });
            return;
        }
        request.body = request.body || {};
        request.body.user = user;
        next();
    });
}
export default postRoutes;

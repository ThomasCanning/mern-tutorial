import express from "express";
import { getDb } from './connect.js';
import { ObjectId } from 'mongodb';
import { hash as bcryptHash, compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "./secrets.js";
const userRoutes = express.Router();
const SALT_ROUNDS = 7;
/* retrieves all users */
userRoutes.route("/users").get(async (request, response) => {
    let db = getDb();
    let data = await db.collection("users").find({}).toArray();
    if (data.length > 0) {
        response.json(data);
    }
    else {
        throw new Error("Data was not found");
    }
});
/* retrieves a user */
userRoutes.route("/users/:id").get(async (request, response) => {
    const db = getDb();
    const data = await db.collection("users").findOne({ _id: new ObjectId(request.params.id) });
    if (data) {
        response.json(data);
    }
    else {
        throw new Error("Data was not found");
    }
});
/*create a user */
userRoutes.route("/users").post(async (request, response) => {
    const db = getDb();
    const takenEmail = db.collection("users").findOne({ email: request.body.email });
    if (await takenEmail) {
        response.json({ message: "This email is taken" });
    }
    else {
        const hash = await bcryptHash(request.body.password, SALT_ROUNDS);
        const mongoObject = {
            name: request.body.name,
            email: request.body.email,
            password: hash,
            joinDate: new Date(),
            posts: [],
        };
        const data = await db.collection("users").insertOne(mongoObject);
        response.json(data);
    }
});
/* updates a user */
userRoutes.route("/users/:id").put(async (request, response) => {
    const db = getDb();
    const mongoObject = {
        $set: {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            joinDate: request.body.joinDate,
            posts: request.body.posts,
        }
    };
    const data = await db.collection("users").updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
    response.json(data);
});
/* deletes a user */
userRoutes.route("/users/:id").delete(async (request, response) => {
    let db = getDb();
    let data = await db.collection("users").deleteOne({ _id: new ObjectId(request.params.id) });
    response.json(data);
});
/* login a user */
userRoutes.route("/users/login").post(async (request, response) => {
    const db = getDb();
    const user = await db.collection("users").findOne({ email: request.body.email });
    if (user) {
        const confirmation = await compare(request.body.password, user.password);
        if (confirmation) {
            const key = JWT_KEY;
            if (!key) {
                throw new Error("JWT_KEY is not defined in environment variables");
            }
            const token = jwt.sign(user, key, { expiresIn: "1h" });
            response.json({ success: true, token: token });
        }
        else {
            response.json({ success: false, message: "Incorrect password" });
        }
    }
    else {
        response.json({ success: false, message: "No user found with this email" });
    }
});
export default userRoutes;

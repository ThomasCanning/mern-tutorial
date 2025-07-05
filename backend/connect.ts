import {Db, MongoClient, ServerApiVersion} from 'mongodb';
import {ATLAS_URI} from "./secrets.js";

const atlasUri = ATLAS_URI;
if (!atlasUri) {
    throw new Error('Missing ATLAS_URI in environment variables');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(atlasUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let database: Db

export function connectToServer(): void {
    database = client.db('blogData');
}

export function getDb(): Db {
    if (!database) {
        throw new Error('Database connection has not been established. Call connectToServer first.');
    }
    return database;
}
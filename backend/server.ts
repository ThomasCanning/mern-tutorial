import express from "express";
import cors from "cors";
import { connectToServer } from "./connect.js";
import postRoutes from "./postRoutes.js";
import userRoutes from "./userRoutes.js";

const app = express();
const PORT = 3000

app.use(cors());
app.use(express.json());
app.use(postRoutes)
app.use(userRoutes)

app.listen(PORT, () => {
    connectToServer()
    console.log("Server is running on port " + PORT);
})
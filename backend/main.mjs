import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
const port = process.env.PORT || 5000;

import connectDatabase from "./config/database.mjs";

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}),
);
app.use(morgan("dev"));

// routes
import contactRoutes from "./routes/contactRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";

app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);


connectDatabase();
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});

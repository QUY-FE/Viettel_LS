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
import contactRoutes from "./routes/contact.routes.mjs";
import userRoutes from "./routes/user.routes.mjs";
import productRoutes from "./routes/product.routes.mjs";
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/products", productRoutes);



connectDatabase();
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DB } from "./database/mongodb.js";
import citizenRouter from "./routes/citizen.route.js";
import authRouter from "./routes/auth.route.js";
import swaggerSetup from "./config/swagger.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: false,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Swagger API documentation
swaggerSetup(app);

// Routes
app.use("/api/citizen", citizenRouter);
app.use("/api/v1", authRouter);

// Start server
app.listen(PORT, () => {
  DB();
  console.log(`Server is running on port `);
});

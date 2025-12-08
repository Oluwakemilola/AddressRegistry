import { config } from "dotenv";
config({path: `.env.${process.env.NODE_ENV || "development"}`})

export const {
    PORT,
    MONGODB_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env;
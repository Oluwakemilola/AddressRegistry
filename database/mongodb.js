import express  from "express";
import mongoose from "mongoose";
import { MONGODB_URL } from "../config/env.js";

export const DB = async (req, res) => {
    try {
        await mongoose.connect(`${MONGODB_URL}`)
        console.log("database is connected")
    } catch (error) {
        console.log("database not connected");
        
    }

}
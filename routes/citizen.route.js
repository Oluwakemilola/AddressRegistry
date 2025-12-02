import { Router } from "express";
import { registerCitizen, registerAddress, getCitizenHistory } from "../controller/Citizen.controller.js";

const citizenRouter = Router()

// Register a new citizen
citizenRouter.post("/register", registerCitizen);

// Add / update new address (adds to history)
citizenRouter.patch("/address", registerAddress);

// Get a citizen’s full address history
citizenRouter.get("/history/:nin", getCitizenHistory);

export default citizenRouter;

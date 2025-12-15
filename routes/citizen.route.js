import { Router } from "express";
import { registerAddress,  editAddress, getCurrentAddress,
    getCitizenHistory } from "../controller/Citizen.controller.js";

const citizenRouter = Router()


// Add / update new address (adds to history)
citizenRouter.post("/address", registerAddress);

// Update Address
citizenRouter.patch("/address/:addressId", editAddress)

// Get a citizen’s full address history
citizenRouter.get("/history/:nin", getCitizenHistory);

// to get current Address
citizenRouter.get("/address/current/:nin", getCurrentAddress)

export default citizenRouter;

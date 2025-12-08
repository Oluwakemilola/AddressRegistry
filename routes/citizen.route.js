import { Router } from "express";
import { registerAddress, getCitizenHistory } from "../controller/Citizen.controller.js";

const citizenRouter = Router()


// Add / update new address (adds to history)
citizenRouter.patch("/address", registerAddress);

// Get a citizen’s full address history
citizenRouter.get("/history/:nin", getCitizenHistory);

export default citizenRouter;

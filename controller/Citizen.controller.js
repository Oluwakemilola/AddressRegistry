import Citizen from "../models/Citizen.model.js";

// 1. Register a new citizen
export const registerCitizen = async (req, res) => {
    try {
        const { fname, lname, nin, email, password } = req.body;

        if (!fname || !lname || !nin || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingCitizen = await Citizen.findOne({ nin });
        if (existingCitizen) {
            return res.status(400).json({ message: "Citizen already exists" });
        }

        const citizen = await Citizen.create({
            fname,
            lname,
            nin,
            email,
            password,
            History: []
        });

        return res.status(201).json({
            message: "Citizen registered successfully",
            fname: citizen.fname
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



// 2. Add new address = push into History array
export const registerAddress = async (req, res) => {
    try {
        const {
            nin,
            country,
            state,
            lga,
            street,
            housenumber,
            datemovedin,
            datemovedout
        } = req.body;

        if (!nin || !country || !state || !lga || !street || !housenumber || !datemovedin || !datemovedout) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // find the citizen
        const citizen = await Citizen.findOne({ nin });
        if (!citizen) {
            return res.status(404).json({ message: "Citizen not found" });
        }

        // Add new address to history
        citizen.History.push({
            country,
            state,
            lga,
            street,
            housenumber,
            datemovedin,
            datemovedout
        });

        await citizen.save();

        return res.status(200).json({
            message: "Address added successfully",
            fname: citizen.fname,
            History: citizen.History
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



// 3. Get full address history
export const getCitizenHistory = async (req, res) => {
    try {
        const { nin } = req.params;

        const citizen = await Citizen.findOne({ nin });

        if (!citizen) {
            return res.status(404).json({ message: "Citizen not found" });
        }

        return res.status(200).json({
            message: "Address history retrieved",
            fname: citizen.fname,
            history: citizen.History
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

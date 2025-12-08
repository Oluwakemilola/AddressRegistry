import Citizen from "../models/Citizen.model.js";
import geocoder from "../utils/geocoder.js";

export const registerAddress = async (req, res) => {
    try {
        const {
            nin,
            country,
            state,
            city,
            lga,
            street,
            housenumber,
            datemovedin,
            datemovedout
        } = req.body;

        if (!nin || !state || !datemovedin || !datemovedout) {
            return res.status(400).json({
                message: "nin, state, datemovedin and datemovedout are required"
            });
        }

        const citizen = await Citizen.findOne({ nin });
        if (!citizen) {
            return res.status(404).json({ message: "Citizen not found" });
        }

        const fullAddress = `${housenumber || ""} ${street || ""}, ${city || ""}, ${state}, ${country || ""}`;
        const geo = await geocoder.geocode(fullAddress);

        let location = {};

        if (geo && geo[0]) {
            location = {
                formattedAddress: geo[0].formattedAddress , // fallback
                latitude: geo[0].latitude || null,
                longitude: geo[0].longitude || null,
            };
        } else {
            // If geocoder returns nothing, fallback to user input
            location = {
                formattedAddress: fullAddress,
                latitude: null,
                longitude: null,
            };
        }

        citizen.History.push({
            country,
            state,
            city,
            lga,
            street,
            housenumber,
            datemovedin: new Date(datemovedin),
            datemovedout: new Date(datemovedout),
            ...location,
        });

        await citizen.save();

        return res.status(200).json({
            message: "Address added successfully",
            fullname: citizen.fullname,
            history: citizen.History
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Get full address history
export const getCitizenHistory = async (req, res) => {
    try {
        const { nin } = req.params;

        const citizen = await Citizen.findOne({ nin });

        if (!citizen) {
            return res.status(404).json({ message: "Citizen not found" });
        }

        return res.status(200).json({
            message: "Address history retrieved",
            fullname: citizen.fullname,
            history: citizen.History
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

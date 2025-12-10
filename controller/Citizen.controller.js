import Citizen from "../models/Citizen.model.js";
import geocodeAddress from "../utils/geocoder.js";

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

    // Required fields check
    if (!nin || !state || !datemovedin || !datemovedout) {
      return res.status(400).json({
        message: "nin, state, datemovedin and datemovedout are required"
      });
    }

    // Find citizen
    const citizen = await Citizen.findOne({ nin });
    if (!citizen) {
      return res.status(404).json({ message: "Citizen not found" });
    }

    // Build full address string
    const fullAddress = `${housenumber || ""} ${street || ""}, ${city || ""}, ${state}, ${country || ""}`;

    // Nominatim geocode
    const geo = await geocodeAddress(fullAddress);

    // Build location details
    const location = {
      formattedAddress: geo
        ? fullAddress.trim()
        : fullAddress.trim(),
      latitude: geo ? geo.latitude : null,
      longitude: geo ? geo.longitude : null,
    };

    // Push into address history
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

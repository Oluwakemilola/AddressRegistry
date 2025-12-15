import Citizen from "../models/Citizen.model.js";
import geocoder from "../utils/geocoder.js";



// POST: Add a new address (append-only)
export const registerAddress = async (req, res) => {
  try {
    const {nin, country, state, city, lga, street, housenumber, datemovedin } = req.body;

    if (!nin || !state || !datemovedin)
      return res.status(400).json({ message: "nin, state, and datemovedin are required" });

    const citizen = await Citizen.findOne({ nin });
    if (!citizen) return res.status(404).json({ message: "Citizen not found" });

    // Close previous active address
    const lastAddress = citizen.History[citizen.History.length - 1];
    if (lastAddress && !lastAddress.datemovedout) lastAddress.datemovedout = new Date(datemovedin);

    // Geocode address
    const fullAddress = `${housenumber || ""} ${street || ""}, ${city || ""}, ${state}, ${country || ""}`.trim();
    const geo = await geocoder(fullAddress);

    const location = {
      formattedAddress: fullAddress,
      latitude: geo ? geo.latitude : null,
      longitude: geo ? geo.longitude : null,
    };

    citizen.History.push({
      country,
      state,
      city,
      lga,
      street,
      housenumber,
      datemovedin: new Date(datemovedin),
      datemovedout: null,
      ...location,
    });

    await citizen.save();

    const currentAddress = citizen.History[citizen.History.length - 1];

    return res.status(200).json({
      message: "Address added successfully",
      fullname: citizen.fullname,
      currentAddress,
      history: citizen.History,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET: Full address history
export const getCitizenHistory = async (req, res) => {
  try {
    const { nin } = req.params;
    const citizen = await Citizen.findOne({ nin });
    if (!citizen) return res.status(404).json({ message: "Citizen not found" });

    return res.status(200).json({
      message: "Address history retrieved successfully",
      fullname: citizen.fullname,
      history: citizen.History,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET: Current active address
export const getCurrentAddress = async (req, res) => {
  try {
    const { nin } = req.params;
    const citizen = await Citizen.findOne({ nin });
    if (!citizen) return res.status(404).json({ message: "Citizen not found" });

    const currentAddress = citizen.History.find((addr) => !addr.datemovedout);
    if (!currentAddress) return res.status(404).json({ message: "No active address found" });

    return res.status(200).json({
      message: "Current address retrieved successfully",
      fullname: citizen.fullname,
      currentAddress,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PATCH: Minor edit of an existing address by ID
export const editAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { country, state, city, lga, street, housenumber } = req.body;

    const citizen = await Citizen.findOne({ "History._id": addressId });
    if (!citizen) return res.status(404).json({ message: "Address not found" });

    const address = citizen.History.id(addressId);

    if (country) address.country = country;
    if (state) address.state = state;
    if (city) address.city = city;
    if (lga) address.lga = lga;
    if (street) address.street = street;
    if (housenumber) address.housenumber = housenumber;

    await citizen.save();

    return res.status(200).json({
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
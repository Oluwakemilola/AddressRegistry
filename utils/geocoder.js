import NodeGeocoder from "node-geocoder";
import Google_Map_Api_Key from "../config/env.js"

const options = {
  provider: "google",
  formatter: null,
  apiKey: process.env.Google_Map_Api_Key
};

const geocoder = NodeGeocoder(options);

export default geocoder;


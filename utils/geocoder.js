import NodeGeocoder from "node-geocoder";


const options = {
  provider: "google",
  formatter: null,
  apiKey: process.env.Google_Map_Api_Key
};

const geocoder = NodeGeocoder(options);

export default geocoder;


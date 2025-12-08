import NodeGeocoder from "node-geocoder";

const options = {
  provider: "openstreetmap",
  httpAdapter: "https",
  formatter: null,
  fetchOptions: {
    headers: {
      "User-Agent": "AddressRegistry/1.0 (oluwakemilola02@gmail.com)"
      // Replace email with yours
    }
  }
};

const geocoder = NodeGeocoder(options);

export default geocoder;


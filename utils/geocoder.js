import fetch from "node-fetch";

async function geocoder(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "myapp/1.0 (oluwakemilola02@gmail.com)"
    }
  });

  const data = await response.json();

  if (!data || data.length === 0) {
    return null;
  }

  return {
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon),
  };
}

export default geocoder;

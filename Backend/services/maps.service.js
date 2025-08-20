const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  console.log("API KEY:", process.env.GOOGLE_MAPS_API);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log("Google Maps API Response:", response.data);

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(
        `Unable to fetch coordinates: ${response.data.status} - ${
          response.data.error_message || "No details"
        }`
      );
    }
  } catch (error) {
    console.error("Maps API Error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log("Google Distance Matrix Response:", response.data);

    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }
      const element = response.data.rows[0].elements[0];
      if (element.status === "OK") {
        // return {
        //   distance: element.distance.text, // km
        //   duration: element.duration.text, // mins
        //   distanceValue: element.distance.value, // meters
        //   durationValue: element.duration.value, // seconds
        // };
        return element;
      } else {
        throw new Error("No route found between origin and destination");
      }
    } else {
      throw new Error(`Google API Error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Distance Matrix API Error:", error.message);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Some input is required to get suggestions");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const cleanedInput = input
    .trim()
    .replace(/,/g, " ")     // comma ko space me convert karo
    .replace(/\s+/g, " ");  // multiple spaces ko ek space me
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(cleanedInput)}&types=geocode&components=country:IN&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log("Google Suggestions Response:", response.data);
    return response.data.predictions;
  } catch (error) {
    console.error("Suggestions/AutoComplete API Error:", error.message);
    throw error;
  }
};

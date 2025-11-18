import "dotenv/config";
import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = process.env.OPENWEATHER_API_KEY;

// api-client.js (Continuing from above)

/**
 * Fetches the current weather data for a given city.
 * @param {string} locationName - The city or country name provided by the user.
 * @returns {Promise<object>} - The raw JSON weather data from the API.
 * @throws {Error} - If the API request fails or returns an error status.
 */
export async function fetchWeatherByCity(locationName) {
  if (!API_KEY) {
    throw new Error("API Key is missing. Check your .env file.");
  }

  try {
    const url = `${BASE_URL}weather`;

    // This is the core API request using Axios
    const response = await axios.get(url, {
      params: {
        q: locationName,
        appid: API_KEY,
        units: "metric",
      },
    });

    // The raw JSON data from the successful response
    return response.data;
  } catch (error) {
    // Handle API-specific errors
    if (error.response) {
      // Re-throw a more user-friendly error
      throw new Error(
        `API Error: ${error.response.data.message || "Unknown API issue"}`
      );
    }

    // Handle network errors
    throw new Error(`Network Error: Failed to connect to the weather service.`);
  }
}

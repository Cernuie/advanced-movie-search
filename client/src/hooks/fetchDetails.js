const axios = require("axios");

const apiKey = '4a3b711b'
const url = 'https://www.omdbapi.com/?i='


export const fetchDetails = async (imdbID) => {
  try {
    const { data } = await axios.get(`${url}${imdbID}`, {
      params: {
        api_key: apiKey,
      }
    });

    return data;
  } catch (error) {
    console.log(error)
  }
}
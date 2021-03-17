const axios = require('axios');

const apiKey = 'b982a0ac1f7e5b7165da37d7d73cfb13';
const url = 'https://api.themoviedb.org/3';
const movieUrl = `${url}/movie`;


const UseVideoFinder = async (id) => {

  try {
    const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
      params: {
        api_key: apiKey,
      }
    });
    console.log(data.results[0])
    return data.results[0];
  } catch (error) {
    console.log(error)
  }

}

export default UseVideoFinder;


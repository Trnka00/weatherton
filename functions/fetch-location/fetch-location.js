// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const axios = require('axios');

const handler = async event => {
  const { locationName } = event.queryStringParameters;

  // console.log(locationName);

  const API_KEY = process.env.API_SECRET;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${API_KEY}`;

  try {
    const { data } = await axios.get(url);
    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;

    return {
      statusCode: status,
      body: JSON.stringify(status, statusText, headers, data),
    };
  }
};

module.exports = { handler };

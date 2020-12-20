const {
  prepareResponse,
  simulateProcess,
} = require("./weatherUtils");

const GetWeather = async (call, callback) => {
  console.log("Request received: " + JSON.stringify(call));

  const { city } = call.request;

  await simulateProcess();

  callback(null, prepareResponse(city));
};

exports.GetWeather = GetWeather;

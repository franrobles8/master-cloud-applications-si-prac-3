const WEATHERS = {
  SUNNY: "Sunny",
  RAINY: "Rainy",
};

const startsWithVowel = (city) => /[aeiouAEIOU]/i.test(city[0]);
const prepareResponse = (city) => {
  const weather = {
    city,
  };
  return startsWithVowel(city)
    ? { ...weather, weather: WEATHERS.RAINY }
    : { ...weather, weather: WEATHERS.SUNNY };
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const simulateProcess = async () => {
  const MILLISECONDS = 1000;
  await sleep((Math.floor(Math.random() * 3) + 1) * MILLISECONDS);
};

module.exports = {
    prepareResponse,
    simulateProcess
};

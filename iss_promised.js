
//install request-promise-native via npm using npm i request-promise-native
//importing request-promise-native from node
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
}
const fetchCoordsByIP = function(body){
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};
const fetchISSFlyOverTimes = function(body) {
  let result = {latitude: 0, longitude: 0}
  result.latitude = JSON.parse(body).latitude;
  result.longitude = JSON.parse(body).longitude;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${result.latitude}&lon=${result.longitude}`;
  return request(url);
};
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};
module.exports = { nextISSTimesForMyLocation };
const grpc = require("grpc");
const GetWeather = require('./weatherService');
const WeatherService = require('./interface');

const server = new grpc.Server();

server.addService(WeatherService.service, GetWeather);

server.bind("127.0.0.1:9090", grpc.ServerCredentials.createInsecure());
console.log("gRPC server running at http://127.0.0.1:9090");
server.start();

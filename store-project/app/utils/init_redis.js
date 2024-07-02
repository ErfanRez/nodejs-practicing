const redisDB = require("redis");
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log("connecting to redis..."));
redisClient.on("ready", () => console.log("ready to use redis"));
redisClient.on("error", (err) => console.log("Redis Error: ", err.message));
redisClient.on("end", () => console.log("disconnected from redis!"));

module.exports = redisClient;

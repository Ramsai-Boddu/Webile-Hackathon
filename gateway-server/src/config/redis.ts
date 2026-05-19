import { createClient } from "redis";

const redisClient = createClient({
    url: "redis://127.0.0.1:6379",
    socket: {
        reconnectStrategy: false
    }
});

redisClient.on("error", () => {
    console.log("Redis not running");
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Redis Connected");
    } catch (error) {
        console.log("Skipping Redis...");
    }
};

connectRedis();

export default redisClient;
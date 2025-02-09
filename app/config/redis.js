const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

// const redisClient = redis.createClient({
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//   }
// });

// redisClient.connect().then(() => console.log('Redis connected')).catch(console.error);

// module.exports = redisClient;

const { createClient } = require('redis');

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => console.error('Redis connection error:', err));

redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Redis connection failed:', err));

module.exports = redisClient; // Pastikan hanya ada satu instance yang diekspor

const redisClient = require('../config/redis');

exports.setCache = async (key, value, expiry = 3600) => {
  await redisClient.setEx(key, expiry, JSON.stringify(value));
};

exports.getCache = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};
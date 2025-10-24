const { createClient } = require('redis');
require('dotenv').config();

const redisclient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
          host: 'redis-15293.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 15293
    }
});

module.exports = redisclient;
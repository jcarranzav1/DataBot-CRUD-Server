require('dotenv').config();

const config = {
  port: process.env.PORT || 3500,
  mongodb_uri: process.env.MONGODB_URI,
  test_uri: process.env.TEST_DATABASE_URI,
};
module.exports = config;

require('dotenv').config();

const config = {
  PORT: process.env.port || 3500,
  MONGODB_URI: process.env.database_uri,
  TEST_DATABASE_URI: process.env.TEST_DATABASE_URI,
};
module.exports = config;

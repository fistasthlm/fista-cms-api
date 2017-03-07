'use strict';

module.exports = {
   name: 'API',
   version: '0.0.1',
   env: process.env.NODE_ENV || 'development',
   port: process.env.PORT || 3000,
   base_url: process.env.BASE_URL || 'http://localhost:3000',
   db: {
      // uri: 'mongodb://127.0.0.1:27017/api',
      uri: 'mongodb://heroku_sdjx8wg1:@ds135069.mlab.com:35069/heroku_sdjx8wg1'
   },
};

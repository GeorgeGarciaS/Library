const mongoose = require('mongoose');

const mongoServer = require('./mongoDbConfigTesting');
const app = require('../app');

beforeAll((done) => {
  // populate DB if necessary
  done();
});

afterAll((done) => {
  // closing the DB connection allows Jest to exit successfully
  mongoose.disconnect();
  mongoServer.stop();
  done();
});

exports.app = app;

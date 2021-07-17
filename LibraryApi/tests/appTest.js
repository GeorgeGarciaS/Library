const mongoose = require('mongoose');

const mongoServer = require('./mongoDbConfigTesting');
const app = require('../app');
const populateDb = require('./populateDb');

beforeAll((done) => {
  populateDb.populateDbNow(done);
});

afterAll((done) => {
  // closing the DB connection allows Jest to exit successfully
  mongoose.disconnect();
  mongoServer.stop();
  done();
});

exports.app = app;

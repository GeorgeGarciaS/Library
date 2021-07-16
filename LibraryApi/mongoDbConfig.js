const mongoose = require('mongoose');
const fs = require('fs');

// extract key from file
let keys = false;
fs.readFile('tests/bookInfo.json', 'utf8', (err, jsonString) => {
  if (err) {
    throw err;
  }
  try {
    keys = JSON.parse(jsonString);
  } catch (error) {
    console.log('Error parsing JSON string:', error);
  }
});

// set up mongoose connection
const mongoDbLink = keys.serverLink;
mongoDbLink.replace('<User>', keys.dbUser);
mongoDbLink.replace('<Password>', keys.dbPassword);

const mongoDb = mongoDbLink;

mongoose.connect(
  mongoDb,
  {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
  },
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

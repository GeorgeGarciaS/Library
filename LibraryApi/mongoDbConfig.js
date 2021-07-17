const mongoose = require('mongoose');
const fs = require('fs');

// extract key from file
function fetchKeys() {
  let keys = false;
  fs.readFile('./Keys.json', 'utf8', async (error, jsonString) => {
    if (error) {
      console.log('Error fetching JSON:', error);
    }
    try {
      keys = JSON.parse(jsonString);
    } catch (err) {
      console.log('Error parsing JSON string:', err);
    }
    return keys;
  });
}

async function setMongoDb() {
  const keys = await fetchKeys();
  if (keys) {
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
  }
}

setMongoDb();

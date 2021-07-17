const mongoose = require('mongoose');

// Set up mongoose connection
const dbUser = 'george';
const dbPassword = '12345';
const mongoDb = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.vwl9k.mongodb.net/myFirstDatabase?retryWrites=true`;

mongoose.connect(
  mongoDb,
  {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
  },
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

// setup mock memory DB that resets when test finish
mongoose.Promise = Promise;
mongoServer.getUri().then((mongoUri) => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on('error', (error) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(error);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(error);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});

module.exports = mongoServer;

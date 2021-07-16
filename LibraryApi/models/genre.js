const mongoose = require('mongoose');

const { Schema } = mongoose;

const GenreSchema = new Schema(
  {
    name: { type: String, maxLength: 100, required: true },
  },
);

// virtual for genre's url //
// required because supertest does not accept dynamic urls within test
GenreSchema
  .virtual('url')
  .get(function () {
    return `/genres/${this._id}`;
  });

module.exports = mongoose.model('Genre', GenreSchema);

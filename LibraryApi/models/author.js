const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date, required: true},
    date_of_death: {type: Date, default: null},
  },
);

// virtual for author's url //
// required because supertest does not accept dynamic urls within test
AuthorSchema
  .virtual('url')
  .get(function () {
    return `/authors/${this._id}`;
  });

module.exports = mongoose.model('Author', AuthorSchema);

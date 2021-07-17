const mongoose = require('mongoose');
const { DateTime } = require('luxon');

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

// Virtual for author's birth date in iso8601(YYYY-MM-DD)
AuthorSchema
  .virtual('date_of_birth_formatted')
  .get(function () {
    if (this.date_of_birth !== undefined) {
      return DateTime.fromJSDate(this.date_of_birth).toISODate();
    }
  });

// Virtual for author's death date in iso8601(YYYY-MM-DD)
AuthorSchema
  .virtual('date_of_death_formatted')
  .get(function () {
    if (this.date_of_death !== undefined) {
      return DateTime.fromJSDate(this.date_of_death).toISODate();
    }
  });

module.exports = mongoose.model('Author', AuthorSchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  },
);

// virtual for book's url //
// required because supertest does not accept dynamic urls within test
BookSchema
  .virtual('url')
  .get(function () {
    return `/books/${this._id}`;
  });

module.exports = mongoose.model('Book', BookSchema);

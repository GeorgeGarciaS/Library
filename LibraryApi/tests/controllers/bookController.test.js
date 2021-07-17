const request = require('supertest');
const {app} = require('../appTest');
const helper = require('./helperFunctions');

describe('book sanitization process', () => {
  test('capitalization and trim of string input', async () => {
    author = await helper.getAuthorObj('Test Author');
    await request(app)
      .post('/books')
      .send({
        title: '   Test   one    ',
        author: author._id,
        summary: '      Test    summary    for test book ',
        isbn: '    isbnXXXXX11     ',
        genre: [],
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          title: 'Test one',
          author: expect.any(Object),
          summary: 'Test summary for test book',
          isbn: 'isbnXXXXX11',
          genre: [],
        });
      });
  });
});

describe('Book validation process', () => {
  test('rejection of invalid author', async () => {
    await request(app)
      .post('/books')
      .send({
        title: 'Test Two',
        summary: 'Test summary for test book',
        isbn: 'isbnXXXXXX11',
        genre: [],
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          errors: {
            author: 'Author must be specified.',
          },
        });
      });
  });
  test('successful validation example', async () => {
    author = await helper.getAuthorObj('Test Author');
    await request(app)
      .post('/books')
      .send({
        title: 'Test Three',
        author: author._id,
        summary: 'Test summary for test book',
        isbn: 'isbnXXXXXX11',
        genre: [],
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          title: 'Test Three',
          author: expect.any(Object),
          summary: 'Test summary for test book',
          isbn: 'isbnXXXXXX11',
          genre: [],
        });
      });
  });
});

test('return format for get /books/ID', async () => {
  book = await helper.getBookObj('Test Book');
  await request(app)
    .get(book.url)
    .expect((res) => {
      expect(res.body).toEqual({
        title: 'Test Book',
        summary: 'Summary of test book',
        author: expect.any(Object),
        isbn: '0000000000000',
        genre: [
          expect.any(Object),
        ],
      });
    });
});

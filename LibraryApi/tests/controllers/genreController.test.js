const request = require('supertest');
const {app} = require('../appTest');
const helper = require('./helperFunctions');

describe('genre sanitization process', () => {
  test('capitalization and trim of string input', async () => {
    await request(app)
      .post('/genres')
      .send({
        name: '  Test    one',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          name: 'test One',
        });
      });
  });
});

describe('genre validation process', () => {
  test('rejection of invalid alphanumeric name', async () => {
    await request(app)
      .post('/genres')
      .send({
        name: 'Test Two$',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          errors: {
            name: 'Genre must only contain alphanumeric characters and spaces.',
          },
        });
      });
  });

  test('successful validation example', async () => {
    await request(app)
      .post('/genres')
      .send({
        name: 'Test Three',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          name: 'Test Three',
        });
      });
  });
});

test('return format for get /genres/ID', async () => {
  const genre = await helper.getGenreObj('Test Genre');
  await request(app)
    .get(genre.url)
    .expect((res) => {
      expect(res.body).toEqual({
        name: 'Test Genre',
        books: [
          expect.any(Object),
        ],
      });
    });
});

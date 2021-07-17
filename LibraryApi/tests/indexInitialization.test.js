const request = require('supertest');
const {app} = require('./appTest');

test('index route initialization', (done) => {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body).toEqual({
        data: {
          bookCount: expect.any(Number),
          genreCount: expect.any(Number),
          authorCount: expect.any(Number),
        },
      });
    })
    .end(done);
});

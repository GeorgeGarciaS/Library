const request = require('supertest');
const {app} = require('../appTest');
const helper = require('./helperFunctions');

describe('Author sanitization process', () => {
  test('capitalization and trim of string input', async () => {
    await request(app)
      .post('/authors')
      .send({
        first_name: '    test one  ',
        family_name: '   test One',
        date_of_birth: '2007-01-20',
        date_of_death: '2017-01-20',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          first_name: 'Test One',
          family_name: 'Test One',
          date_of_birth: '2007-01-20',
          date_of_death: '2017-01-20',
        });
      });
  });
});

describe('Author validation process', () => {
  test('rejection of invalid date (input is DD/MM instead of MM/DD)', async () => {
    request(app)
      .post('/authors')
      .send({
        first_name: 'Test Two',
        family_name: 'Test Two',
        date_of_birth: '20/01/2007',
        date_of_death: '20/01/2017',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          errors: {
            date_of_birth: 'Invalid date of birth, date has to be in ISO8601 format.',
            date_of_death: 'Invalid date of death, date has to be in ISO8601 format.',
          },
        });
      });
  });
  test('rejection of invalid alphanumeric name', async () => {
    await request(app)
      .post('/authors')
      .send({
        first_name: 'Test Three$$',
        family_name: 'Test Three$$',
        date_of_birth: '2007-01-20',
        date_of_death: '2017-01-20',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          errors: {
            first_name: 'First name has non-alphanumeric characters or digits.',
            family_name: 'Family name has non-alphanumeric characters or digits.',
          },
        });
      });
  });
  test('rejection of greater birth date than death date', async () => {
    await request(app)
      .post('/authors')
      .send({
        first_name: 'Test Four',
        family_name: 'Test Four',
        date_of_birth: '2017-01-20',
        date_of_death: '2007-01-20',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          errors: {
            date_of_birth: 'Date of birth is greater than Date of death',
          },
        });
      });
  });
  test('successful validation example with no date of death', async () => {
    await request(app)
      .post('/authors')
      .send({
        first_name: 'Test Five',
        family_name: 'Test Five',
        date_of_birth: '2007-01-20',
        date_of_death: null,
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          first_name: 'Test Five',
          family_name: 'Test Five',
          date_of_birth: '2007-01-20',
          date_of_death: null,
        });
      });
  });
  test('successful validation example', async () => {
    await request(app)
      .post('/authors')
      .send({
        first_name: 'Test Six',
        family_name: 'Test Six',
        date_of_birth: '2007-01-20',
        date_of_death: '2017-01-20',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({
          first_name: 'Test Six',
          family_name: 'Test Six',
          date_of_birth: '2007-01-20',
          date_of_death: '2017-01-20',
        });
      });
  });
});

test('return format for get /authors/ID', async () => {
  author = await helper.getAuthorObj('Test Author');
  await request(app)
    .get(author.url)
    .expect((res) => {
      expect(res.body).toEqual({
        first_name: 'Test Author',
        family_name: 'Test Author',
        date_of_birth: '2007-01-20',
        date_of_death: '2017-01-20',
        books: [
          expect.any(Object),
        ],
      });
    });
});

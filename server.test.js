const request = require('supertest');

describe('GET /games', () => {
  beforeAll(() => {
    return db('games').del();
  });

  test('if we get an empty list of games', () => {
    return request(server)
      .get('/games')
      .expect(200)
      .expect(db('games'))
      .toHaveLength(0);
  });
  test('if we get a list of games', () => {
    request(server)
      .post('/games')
      .send({
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      });

    return request(server)
      .get('/games')
      .expect(db('games'))
      .toHaveLength(1);
  });
});

describe('POST /games', () => {
  beforeAll(() => {
    return db('games').del();
  });

  test('if game is created', () => {
    request(server)
      .post('/games')
      .send({
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      })
      .expect(201);
  });

  test('if title is required', () => {
    request(server)
      .post('/games')
      .send({
        title: '',
        genre: 'Arcade',
        releaseYear: 1980
      })
      .expect(422);
  });

  test('if genre is required', () => {
    request(server)
      .post('/games')
      .send({
        title: 'Pacman',
        genre: '',
        releaseYear: 1980
      })
      .expect(422);
  });

  test('if releaseYear is required', () => {
    request(server)
      .post('/games')
      .send({
        title: 'Pacman',
        genre: ''
      })
      .expect(201);
  });
});

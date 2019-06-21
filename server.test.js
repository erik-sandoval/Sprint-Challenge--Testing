const request = require('supertest');
const server = require('./server');

const db = require('./knexConfig');

describe('GET /games', () => {
  beforeAll(async () => {
    await db('games').del();
  });

  test('if we get an empty list of games', async () => {
    await request(server)
      .get('/games')
      .expect(200);

    const games = await db('games');
    await expect(games).toHaveLength(0);
  });

  test('if we get a list of games', async () => {
    await db('games').insert({
      title: 'Pacman',
      genre: 'Arcade',
      releaseYear: 1980
    });

    await request(server).get('/games');

    const games = await db('games');

    await expect(games).toHaveLength(1);
  });
});

describe('POST /games', () => {
  beforeAll(() => {
    return db('games').del();
  });

  test('if game is created', async () => {
    await request(server)
      .post('/games')
      .send({
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      })
      .expect(201);
  });

  test('if title is required', async () => {
    await request(server);
    request(server)
      .post('/games')
      .send({
        title: '',
        genre: 'Arcade',
        releaseYear: 1980
      })
      .expect(422);
  });

  test('if genre is required', async () => {
    await request(server);
    request(server)
      .post('/games')
      .send({
        title: 'Pacman',
        genre: '',
        releaseYear: 1980
      })
      .expect(422);
  });

  test('if releaseYear is optional', async () => {
    await request(server);
    request(server)
      .post('/games')
      .send({
        title: 'Pacman',
        genre: ''
      })
      .expect(201);
  });
});

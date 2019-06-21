const db = require('./knexConfig');

module.exports = {
  getGames,
  insert
};

function getGames() {
  return db('games')
}

function insert(game) {
  return db('games').insert(game)
}

const db = require('./knexConfig');

module.exports = {
  getGames,
  insert
};

function getGames() {
  return db;
}

function insert(game) {
  return db.insert(game);
}

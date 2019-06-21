const express = require('express');
const server = express();

const db = require('./gamesModel');

server.use(express.json());

server.get('/games', (req, res) => {
  db.getGames()
    .then(games => {
      if (games.length > 0) {
        res.status(200).json(games);
      } else {
        res.status(200).json({ message: 'no games available to show' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error', error: err });
    });
});

server.post('/games', (req, res) => {
  const {title, genre, releaseYear} = req.body
  db.insert(req.body)
    .then(game => {
      console.log(game)
      res.status(201).json({ game });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error', error: err });
    });
});

module.exports = server;

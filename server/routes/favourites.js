const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const { getMoviesFromFavorites } = require('../helpers/dbHelpers');

module.exports = (db) => {
  router.get("/favorites", (req, res) => {
    jsonwebtoken.verify(req.header)
    getMoviesFromFavorites(req.body.id)
      .then(movies => {
        if (movies) {
          res.json({
            movies:movies
          })
        }
      })

  })
}

const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const jwt_decode = require("jwt-decode")

const { getMoviesFromFavorites, getEmailFromUser } = require('../helpers/dbHelpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("header:", req.headers)
    decoded = jwt_decode(req.headers.authorization);
    getEmailFromUser(decoded.id).then((user) => {
      console.log(user)
        getMoviesFromFavorites(user).then(movies => {
          res.json({
            movies:movies
          })
        })
      })
  })

  return router;
}

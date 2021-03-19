const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const jwt_decode = require("jwt-decode")

const { addMoviesToWatchList, getImdbIDsFromWatchList, getIDsFromWatchlist, deleteMediaFromWatchlist } = require('../helpers/dbHelpers');

module.exports = (db) => {
  router.get('/', (req, res) => {
    decoded = jwt_decode(req.headers.authorization)
    //get imdb ids from watchlist
    getImdbIDsFromWatchList(decoded.id)
      .then((movies) => {
        console.log("imdb returns here:", movies)
        res.json({
          imdbID: movies
        })
      })
  })

  router.post('/new', (req, res) => {
    const decoded = jwt_decode(req.body.headers.Authorization)
    console.log("req.query here", req.query)

    addMoviesToWatchList(decoded.id, req.query.movieID)
      .then((response) => {
        console.log("added response:", response)
        res.json({
          passed: "passed"
        })
      })
  })

  router.get('/new', (req, res) => {
    const decoded = jwt_decode(req.headers.authorization);
    getIDsFromWatchlist(decoded.id, req.query.movieID)
      .then(response => {
        if (response) {
          console.log(response)
          res.json({
            pass: "passed"
          })
        } else {
          res.json({
            pass: "failed"
          })
        }
      })
  })

  router.delete('/new', (req, res) => {
    const decoded = jwt_decode(req.headers.authorization);
    // delete movie from watchlist by using imdb id from query and userid from header
    deleteMediaFromWatchlist(decoded.id, req.query.movieID)
      .then(response => {
        // console.log("did we finally delete", response)
        res.json({
          deletion: "true"
        })
      })

  })

  return router;
}





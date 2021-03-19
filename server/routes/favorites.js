const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const jwt_decode = require("jwt-decode")

const { getEmailFromUser, getMoviesFromFavorites, addMoviesToMedia, addMoviesToFavorites , getMediaFromID, getIDsFromFavorites, deleteMediaFromFavorites , getImdbIDsFromUserID } = require('../helpers/dbHelpers');

module.exports = (db) => {
  router.get('/', (req, res) => {
    //get user id,
    decoded = jwt_decode(req.headers.authorization)
    //then get all imdb ids linked to that user
    getImdbIDsFromUserID(decoded.id)
    .then((movies) => {
      console.log("imdb returns here:", movies)
      //send them back to front end for api calls
      res.json({
        imdbID: movies
      })
    })
  })

  router.post('/new', (req, res) => {
    const decoded = jwt_decode(req.body.headers.Authorization);
    //with query from imdbID, add to favorites using addMovieToFavorites fn
    console.log(req.query)
    addMoviesToFavorites(decoded.id, req.query.movieID)
    .then((response) => {
      console.log("added response:", response)
      res.json({
        passed: "passed"
      })
    })
  })

  router.get('/new', (req, res) => {
    const decoded = jwt_decode(req.headers.authorization);
    getIDsFromFavorites(decoded.id, req.query.movieID)
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
    // delete movie from favorites by using imdb id from query and userid from header
    deleteMediaFromFavorites(decoded.id, req.query.movieID)
    .then(response => {
      // console.log("did we finally delete", response)
      res.json({
        deletion: "true"
      })
    })

  })


  return router;
}

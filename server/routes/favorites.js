const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const jwt_decode = require("jwt-decode")

const { getEmailFromUser, getMoviesFromFavorites, addMoviesToMedia, addMoviesToFavorites , getMediaFromID, getIDsFromFavorites } = require('../helpers/dbHelpers');

module.exports = (db) => {
  router.get('/', (req, res) => {
    decoded = jwt_decode(req.headers.authorization);
    getEmailFromUser(decoded.id).then((user) => {
      console.log(user)
        getMoviesFromFavorites(user.id).then(movies => {
          console.log("movies:", movies)
          res.json({
            movies:movies
          })
        })
      })
  })

  router.post('/new', (req, res) => {
    const decoded = jwt_decode(req.body.headers.Authorization);
    const movie = req.body.movie

    console.log("movie here", movie);
    getEmailFromUser(decoded.id).then((user) => {

      console.log("user here:", user);
      addMoviesToMedia(movie.Title, movie.Type, movie.Year, movie.imdbID).then((mediaID) => {

        console.log("media here", mediaID);
        addMoviesToFavorites(decoded.id, mediaID.id).then(response => {
          res.json({
            response: response
          })
        })
      })
    })
  })

  router.get('/new', (req, res) => {

    // console.log("headers:", req.headers.authorization)
    // console.log("movie:", req.query)
    const decoded = jwt_decode(req.headers.authorization);
    console.log("query", req.query)
    getMediaFromID(req.query.movieID)
      .then((media) => {
        console.log("media here", media);
        if(media !== undefined) {
          getIDsFromFavorites(decoded.id, media.id)
          .then(response => {
            if (response) {
              res.json({
                pass: "passed"
              })
            }
          })
        } else {
          res.json({
            pass: "failed"
          })
        }
      })
  })

  return router;
}

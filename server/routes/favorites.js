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
    // console.log("query", req.query)
    getMediaFromID(req.query.movieID)
      .then((media) => {
        // console.log("media here", media);
        if(media !== undefined) {
          getIDsFromFavorites(decoded.id, imdb.id)
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

  router.delete('/new', (req, res) => {
    const decoded = jwt_decode(req.headers.authorization);

    // console.log("query", req.query)
    getMediaFromID(req.query.movieID)
      .then((media) => {
        // console.log('media status', media)
        deleteMediaFromFavorites(decoded.id, media.id)
        .then(response => {
          // console.log("did we finally delete", response)
          res.json({
            deletion: "true"
          })
        })
      })
    // console.log('query', req.headers.authorization)
    // console.log('query body', req.query)


  })


  return router;
}

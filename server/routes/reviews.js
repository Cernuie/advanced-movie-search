const express = require('express');
const router = express.Router();
const jwt_decode = require('jwt-decode');

const { getReviewsForMedia, sendReviewToDatabase } = require('../helpers/dbHelpers');

module.exports = (db) => {

  router.get('/', (req, res) => {

    getReviewsForMedia(req.query.movieID)
      .then(response => {
        if (response) {
          console.log(response)
          res.json({ pass: "reviews successfully retrieved" })
        } else {
          res.json({ pass: "failed"})
        }
      })
  })

  router.post('/new', (req, res) => {
    const decoded = jwt_decode(req.body.headers.Authorization);
    const stars = req.body.rating
    const message = req.body.message
    sendReviewToDatabase(decoded.id, req.query.movieID, message, stars).then((response) => {
      getReviewsForMedia(req.query.movieID)
      .then(reviews => {
        if (reviews) {
          res.json({ reviews })
        } else {
          res.json({ pass: "failed"})
        }
      })
    })
  })

  router.get('/new', (req, res) => {

    getReviewsForMedia(req.query.movieID)
      .then(response => {
        if (response) {
          res.json({ response })
        } else {
          res.json({ pass: "failed"})
        }
      })
  })

  return router;
}

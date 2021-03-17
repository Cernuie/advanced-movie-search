const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUsersFromEmail, addUser, getEmailFromUser, getMoviesFromFavorites } = require('../helpers/dbHelpers');
const jsonwebtoken = require('jsonwebtoken');
const jwt_decode = require("jwt-decode")

module.exports = (db) => {
  router.post('/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    getUsersFromEmail(email)
      .then((user) => {
        console.log(user)
        if (!user) {
          const hashedPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS | 0)
          addUser(email, hashedPassword)
            .then(user =>
              res.json({
                token: jsonwebtoken.sign({ id: user.id }, process.env.JWT_KEY),
                email: user.email
              })
            )
        }
        else {
          console.log("failed")
        }
      })
  })
  router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    getUsersFromEmail(email)
      .then((user) => {
        console.log(user)
        if (!user) {
          console.log("wrong email")
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            console.log("authenticated")
            console.log(jsonwebtoken.sign({ id: user.id }, process.env.JWT_KEY))
            res.json({
              token: jsonwebtoken.sign({ id: user.id }, process.env.JWT_KEY),
              email: user.email
            })
          } else {
            console.log("wrong password")
          }
        }
      })

  })
  router.get('/verify', (req, res) => {
    console.log(req.headers.authorization)
    decoded = jwt_decode(req.headers.authorization);
    //decoded = jsonwebtoken.decode(req.headers.authorization, process.env.JWT_KEY)
    getEmailFromUser(decoded.id)
      .then((user) => {
        res.json({
          email: user.email
        })
      })
  })

  router.get('/favorites', (req, res) => {
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
  return router;
}

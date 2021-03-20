const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUsersFromEmail, addUser, getEmailFromUser, getMoviesFromFavorites, addMoviesToMedia } = require('../helpers/dbHelpers');
const jsonwebtoken = require('jsonwebtoken');
const jwt_decode = require("jwt-decode")

module.exports = (db) => {
  router.post('/register', (req, res) => {
    console.log(req.body)
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    getUsersFromEmail(email)
      .then((user) => {
        if (!user) {
          const hashedPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS | 0)
          addUser(username, email, hashedPassword)
            .then(user =>
              res.json({
                token: jsonwebtoken.sign({ id: user.id }, process.env.JWT_KEY),
                username: user.username
              })
            )
            return;
        }
        res.json({ error: 'Wrong email or password. Please try again!'});
      })
  })
  router.post('/login', (req, res) => {
    console.log(req.body);
    const email = req.body.email
    const password = req.body.password

    getUsersFromEmail(email)
      .then((user) => {
        console.log("checking user:", user)
        if (!user) {
          res.json({ error: 'Wrong email or password. Please try again!'});
          return
        }

        if (!bcrypt.compareSync(password, user.password)) {
          res.json({ error: 'Wrong email or password. Please try again!'});
          return
        }
        console.log("in the then")
        res.json({
          token: jsonwebtoken.sign({ id: user.id }, process.env.JWT_KEY),
          username: user.username
        })

      }).catch(err => res.json({
        error: err
      }));
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

  return router;
}

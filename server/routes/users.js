const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUsersFromEmail, addUser } = require('../helpers/dbHelpers');

module.exports = (db) => {
  router.post('/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    getUsersFromEmail(email)
      .then((res) => {
        console.log(res)
      if (!res) {
        const hashedPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS | 0)
        addUser(email, hashedPassword)
        .then(res =>
          console.log("passed")
          )
      }
      else {
        console.log("failed")
      }
    })
})
router.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body;

  console.log('req', req)
})

  return router;
}

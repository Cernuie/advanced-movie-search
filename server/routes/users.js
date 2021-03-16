const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUsersFromEmail, addUser } = require('../helpers/dbHelpers');
const jsonwebtoken = require('jsonwebtoken');

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
          console.log("passed")
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
        console.log(bcrypt.compareSync(password, user.password))

        if (bcrypt.compareSync(password, user.password)) {
          console.log("authenticated")
          console.log(jsonwebtoken.sign({ id: user.id }, process.env.JWT_KEY))
          res.json({
            token: jsonwebtoken.sign({ id: user.id }, process.env.JWT_KEY)
          })
        } else {
          console.log("wrong password")
        }
      }
    })

})

  return router;
}

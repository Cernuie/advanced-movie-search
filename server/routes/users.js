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
  const email = req.body.email
  const password = req.body.password

  getUsersFromEmail(email)
    .then((res) => {
      console.log(res)
      if (!res) {
        console.log("wrong email")
      } else {
        console.log(bcrypt.compareSync(password, res.password))

        if (bcrypt.compareSync(password, res.password)) {
          console.log("authenticated")
          res.json({
            token: jsonwebtoken.sign({ id: res.id }, process.env.JWT_SECRET)
          })
        } else {
          console.log("wrong password")
        }
      }
    })

})

  return router;
}

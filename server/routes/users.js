const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUsersFromEmail } = require('../helpers/dbHelpers');

module.exports = (db) => {
  router.post('/register', (req, res) => {

    const {
      email,
      password
    } = req.body;

    console.log(req.body);

    res.json({response: "received"})

  //   Promise.all([
  //     getUsersFromEmail(email)
  //   ]).then((all) => {
  //     console.log(all);
  // })
  //   const {
  //     email,
  //     password
  //   } = req.body;
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

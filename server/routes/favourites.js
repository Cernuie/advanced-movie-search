const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');

module.exports = (db) => {
  router.get("/favourites", (req, res) => {
    jsonwebtoken.verify(req.header)
  })
}

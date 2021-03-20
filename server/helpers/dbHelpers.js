const { response, query } = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'finals'
});

const getMediaFromID = (id) => {
  // console.log("id from call:", id)
  // console.log(id === 'tt5109280')
  const queryString = `
  SELECT * FROM favorites
  WHERE imdb_id = $1;
  `

  const queryParams = [id]

  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows[0]
    })
}

exports.getMediaFromID = getMediaFromID;

const getIDsFromFavorites = (user_id, imdb_id) => {

  const queryString = `
  SELECT * FROM favorites
  WHERE user_id = $1 AND imdb_id = $2;
  `
  const queryParams = [user_id, imdb_id]

  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows[0]
    })
}

exports.getIDsFromFavorites = getIDsFromFavorites;

const deleteMediaFromFavorites = (user_id, imdb_id) => {

  const queryString = `
  DELETE FROM favorites
  WHERE user_id = $1 AND imdb_id = $2;
  `
  const queryParams = [user_id, imdb_id]

  return pool.query(queryString, queryParams)
  .then(res => {
    return res
  })

}

exports.deleteMediaFromFavorites = deleteMediaFromFavorites;

const getEmailFromUser = (id) => {
  const queryString = `
  SELECT * FROM users
  WHERE id = $1;
  `;
  const queryParams = [id]

  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows[0]
    })
}
exports.getEmailFromUser = getEmailFromUser;

const getUsersFromEmail = (email) => {
  const queryString = `
    SELECT * FROM users
    WHERE email = $1;
    `;
  const queryParams = [email]

  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows[0]
    })
}

exports.getUsersFromEmail = getUsersFromEmail;

const addUser = (username, email, password) => {
  const queryString = `
  INSERT INTO users (username, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `
  const queryParams = [username, email, password]

  return pool.query(queryString, queryParams)
    .then(result => result.rows[0])
    .catch((err) => err);
}

exports.addUser = addUser;

const addMoviesToFavorites = (id, movie) => {
  const queryString = `
    INSERT INTO favorites (user_id, imdb_id)
    VALUES ($1, $2)
    RETURNING *;
    `
  const queryParams = [id, movie];

  return pool.query(queryString, queryParams)
    .then(result => result.rows[0])
    .catch((error) => error);
}

exports.addMoviesToFavorites = addMoviesToFavorites;

const getImdbIDsFromUserID = (id) => {
  const queryString = `
  SELECT * FROM favorites
  WHERE user_id = $1;
  `

  const queryParams = [id];

  return pool.query(queryString, queryParams)
    .then(result => result.rows)
    .catch((error) => error)

}

exports.getImdbIDsFromUserID = getImdbIDsFromUserID;

const addMoviesToWatchList = (id, movie) => {
  const queryString = `
    INSERT INTO watchlist (user_id, imdb_id)
    VALUES ($1, $2)
    RETURNING *;
    `
  const queryParams = [id, movie];

  return pool.query(queryString, queryParams)
    .then(result => result.rows[0])
    .catch((error) => error);
}

exports.addMoviesToWatchList = addMoviesToWatchList;


const getImdbIDsFromWatchList = (id) => {
  const queryString = `
  SELECT * FROM watchlist
  WHERE user_id = $1;
  `

  const queryParams = [id];

  return pool.query(queryString, queryParams)
  .then(result => result.rows)
  .catch((error) => error)
}

exports.getImdbIDsFromWatchList = getImdbIDsFromWatchList;

const getIDsFromWatchlist = (user_id, imdb_id) => {
  const queryString = `
  SELECT * FROM watchlist
  WHERE user_id = $1 AND imdb_id = $2;
  `
  const queryParams = [user_id, imdb_id]

  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows[0]
    })
}

exports.getIDsFromWatchlist = getIDsFromWatchlist;

const deleteMediaFromWatchlist = (user_id, imdb_id) => {

  const queryString = `
  DELETE FROM watchlist
  WHERE user_id = $1 AND imdb_id = $2;
  `
  const queryParams = [user_id, imdb_id]

  return pool.query(queryString, queryParams)
  .then(res => {
    return res
  })
}

exports.deleteMediaFromWatchlist = deleteMediaFromWatchlist;

const getReviewsForMedia = (imdb_id) => {

  const queryString = `
  SELECT users.username, user_review, user_rating
  FROM reviews
  JOIN users ON user_id = users.id
  WHERE imdb_id = $1;

  `
  const queryParams = [imdb_id];

  return pool.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(error => error)
}

exports.getReviewsForMedia = getReviewsForMedia;

const sendReviewToDatabase = (user_id, imdb_id, user_review, user_rating) => {

  const queryString = `
    INSERT INTO reviews (user_id, imdb_id, user_review, user_rating)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `

  const queryParams = [user_id, imdb_id, user_review, user_rating]

  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(error => error)
}

exports.sendReviewToDatabase = sendReviewToDatabase;

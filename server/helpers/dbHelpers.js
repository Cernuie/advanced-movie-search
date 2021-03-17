const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'finals'
});

const getEmailFromUser = (id) => {
  const queryString = `
  SELECT * FROM users
  WHERE id = $1;
  `;
  const queryParams = [id]

  return pool.query(queryString, queryParams)
  .then(res=> {
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

const addUser = (email, password) => {
  const queryString = `
  INSERT INTO users (email, password)
  VALUES ($1, $2)
  RETURNING *;
  `
  const queryParams = [email, password]

  return pool.query(queryString, queryParams)
  .then(result => result.rows[0])
  .catch((err) => err);
}

exports.addUser = addUser;

const getMoviesFromFavorites = (id) => {
  const queryString = `
  SELECT media.* FROM media
  JOIN favorites ON media.id = media_id
  JOIN users ON users.id = user_id
  WHERE user_id = $1;
  `
  const queryParams = [id]

  return pool.query(queryString, queryParams)
  .then(res => {
    console.log('res:', res)
    return res.rows
  })
}

exports.getMoviesFromFavorites = getMoviesFromFavorites

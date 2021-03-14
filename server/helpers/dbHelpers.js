const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'finals'
});

const getUsersFromEmail = () => {
    const queryString = `
    SELECT * FROM users
    WHERE id = $1;
    `;
    const queryParams = [email]

    return pool.query(queryString, queryParams)
    .then(result => {
      if (result.rows == null) {
        return null;
      } else {
        return result.rows[0]
      }
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

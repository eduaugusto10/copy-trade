const db = require("../db");
const bcrypt = require("bcrypt");

module.exports = {
  getAllUsers: () => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM users", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        accept(results);
      });
    });
  },

  getUser: (account) => {
    return new Promise((accept, reject) => {
      db.query(
        `SELECT * FROM users WHERE account_number = ?`,
        [account],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.length > 0) {
            accept(results[0]);
          } else {
            accept(false);
          }
        }
      );
    });
  },

  registerUser: (name, email, password, accountNumber) => {
    return new Promise((accept, reject) => {
      const hash = bcrypt.hashSync(password, 10);
      db.query(
        `INSERT INTO users (name, email, password, accountNumber) VALUES (?, ?, ?, ?)`,
        [name, email, hash, accountNumber],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          accept(results);
        }
      );
    });
  },

  sessionUser: (email, password) => {
    return new Promise((accept, reject) => {
      db.query(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (bcrypt.compareSync(password, results[0].password)) {
            accept(results);
          } else {
            accept("Senha inválido")
          }
        }
      );
    });
  },
};

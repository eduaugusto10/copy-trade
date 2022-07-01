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
        `SELECT * FROM users WHERE accountNumber = ?`,
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

  registerUser: (name, email, password, accountNumber,lote, validate) => {
    return new Promise((accept, reject) => {
      const hash = bcrypt.hashSync(password, 10);
      db.query(
        `INSERT INTO users (name, email, password, accountNumber,lote, validate) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, email, hash, accountNumber,lote, validate],
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
            accept("Senha inválida")
          }
        }
      );
    });
  },
  updateUser: (name, email, accountNumber,lote, validate) => {
    return new Promise((accept, reject) => {
      db.query(
        `UPDATE users SET name = ?, email = ?, accountNumber = ?, lote = ?, validate = ? WHERE  accountNumber = ?`,
        [name, email, accountNumber, validate, lote, accountNumber],
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
};

const db = require("../db");

module.exports = {
  getAllOrders: () => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM orders order by ordersId asc limit 1 ", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        accept(results);
      });
    });
  },
  getOrders: (ticket) => {
    return new Promise((accept, reject) => {
      db.query(
        `SELECT * FROM orders WHERE ticket = ?`,
        [ticket],
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
  newOrders: (
    ticket,
    symbol,
    price,
    take_profit,
    stop_loss,
    operation_type,
    type_order
  ) => {
    return new Promise((accept, reject) => [
      db.query(
        `INSERT INTO orders (ticket, symbol, price, take_profit, stop_loss, operation_type, type_order) values (?,?,?,?,?,?,?)`,
        [
          ticket,
          symbol,
          price,
          take_profit,
          stop_loss,
          operation_type,
          type_order,
        ], (error, results) =>{
          if(error){
            reject(error)
            return
          }
          accept(results)
        }
      ),
    ]);
  },

  updateOrders: () => {},
};

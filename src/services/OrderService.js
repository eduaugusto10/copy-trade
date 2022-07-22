const db = require("../db");

module.exports = {
  getAllOrders: () => {
    return new Promise((accept, reject) => {
      db.query("SELECT * from orders where time_update >= SUBTIME(current_timestamp, '00:00:03') order by ordersId asc;", (error, results) => {
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
    takeProfit,
    stopLoss,
    operationType,
    orderType,
    percentage
  ) => {
    return new Promise((accept, reject) => [
      db.query(
        `INSERT INTO orders (ticket, symbol, price, takeProfit, stopLoss, operationType, orderType, percentage) values (?,?,?,?,?,?,?,?)`,
        [
          ticket,
          symbol,
          price,
          takeProfit,
          stopLoss,
          operationType,
          orderType,
          percentage
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

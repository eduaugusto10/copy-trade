const OrderService = require("../services/OrderService");

module.exports = {
  getAllOrders: async (req, res) => {
    const orders = await OrderService.getAllOrders();
    res.json(orders[0]);
  },

  getOrders: async (req, res) => {
    const ticket = req.params.ticket;
    const order = await OrderService.getOrders(ticket);
    res.json(order);
  },

  newOrders: async (req, res) => {
    const orders = await OrderService.newOrders(
      req.body.ticket,
      req.body.symbol,
      req.body.price,
      req.body.take_profit,
      req.body.stop_loss,
      req.body.operation_type,
      req.body.type_order
    );
    res.json(orders);
  },

  updateOrders: async (req, res) => {},
};

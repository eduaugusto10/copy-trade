const OrderService = require("../services/OrderService");

module.exports = {
  getAllOrders: async (req, res) => {
      try {
        const orders = await OrderService.getAllOrders();
        const order = {"orders":orders,"length":orders.length}
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro na requisição");
    }
  },

  getOrders: async (req, res) => {
    try {
      const ticket = req.params.ticket;
      const order = await OrderService.getOrders(ticket);
      res.json(order);
  } catch (error) {
      console.log(error);
      res.status(500).send("Erro na requisição");
  }
  },

  newOrders: async (req, res) => {
    try{
      const orders = await OrderService.newOrders(
        req.body.ticket,
        req.body.symbol,
        req.body.price,
        req.body.takeProfit,
        req.body.stopLoss,
        req.body.operationType,
        req.body.orderType,
        req.body.percentage,
        req.body.status_order
      );
      res.json(orders);
    }catch(error){
      console.log(error)
      res.status(500).send("Erro na requisição")
    }
  },

  updateOrders: async (req, res) => {},
};

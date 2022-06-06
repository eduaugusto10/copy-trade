const UserService = require("../services/UserService");


module.exports = {
  getAllUsers: async (req, res) => {
    const users = await UserService.getAllUsers();
    res.json(users);
  },

  getUser: async (req, res) => {
    const account = req.params.account;
    const user = await UserService.getUser(account);
    res.json(user);
  },

  registerUser: async (req, res) => {
    const user = await UserService.registerUser(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.account_number
    );
    res.json(user);
  },

  sessionUser: async (req, res) => {
    const password = await UserService.sessionUser(req.body.email, req.body.password);
    res.json(password);
  },
};

const UserService = require("../services/UserService");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllUsers: async (req, res) => {
    try{
      const users = await UserService.getAllUsers();
      res.json(users);
    }catch(error){
      console.log(error)
      res.status(500).send("Usuário não encontrado")
    }
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
      req.body.accountNumber,
      req.body.lote,
      req.body.validate,
    );
    res.json(user);
  },

  sessionUser: async (req, res) => {
    const password = await UserService.sessionUser(
      req.body.email,
      req.body.password
    );
    res.json(password);
  },
  updateUser: async (req, res) => {
    const user = await UserService.updateUser(
      req.body.name,
      req.body.email,
      req.body.accountNumber,
      req.body.validate,
      req.body.lote,
      req.params.account
    );
    res.json(user);
  },
  deleteUser: async (req, res) => {
    try {
      const account = req.params.account;
      const user = await UserService.deleteUser(account);
      res.status(200).send("Usuário deletado com sucesso");
    } catch (error) {
      console.log(error)
      res.status(500).send("Usuário não deletado")
    }
  }
};

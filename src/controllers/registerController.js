const register = require("../models/registerModel");

const funcregister = async (request, response) => {
  let user = {
    nome: request.body.body.nome,
    idade: request.body.body.idade,
    email: request.body.body.email,
    cargo: request.body.body.cargo,
    avatar: request.body.body.avatar,
    password: request.body.body.password,
    cor : request.body.body.cor
  };
  let data = await register.createAccount(user);
  if (data == 406) {
    return response.status(data).json("Email já existe.");
  } else if (data == 201) {
    return response
      .status(data)
      .json("Funcionário registado com sucesso.");
  }
};

module.exports = { funcregister };

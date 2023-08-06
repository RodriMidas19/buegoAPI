const register = require("../models/registerModel");

const funcregister = async (request, response) => {
  let user = {
    nome: request.body.nome,
    idade: request.body.idade,
    email: request.body.email,
    cargo: request.body.cargo,
    avatar: request.body.avatar,
    password: request.body.password,
  };
  let data = await register.createAccount(user);
  if (data == 406) {
    return response.status(data).json({ message: "Email já existe." });
  } else if (data == 201) {
    return response
      .status(data)
      .json({ message: "Funcionário registado com sucesso." });
  }
};

module.exports = { funcregister };

const login = require("../models/loginModel");

const loginController = async (request, response) => {
  const userinfo = {
    email: request.body.email,
    password: request.body.password,
  };

  const resp = await login.login(userinfo);

  if (resp == 406) {
    return response.status(406).json({ message: "Utilizador não registado" });
  } else if (resp == 401) {
    return response
      .status(401)
      .json({ message: "Já possui uma sessão iniciada" });
  } else {
    return response.status(200).json(resp);
  }
};

module.exports = {
  loginController,
};

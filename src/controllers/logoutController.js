const model = require("../models/logoutModel");

const logout = async (request, response) => {
  let resp = await model.logout(request.user);
  if (resp == 401) {
    return response.status(401).json({ message: "Token inválido" });
  } else if (resp == 200) {
    return response
      .status(200)
      .json({ message: "Sessão finalizada com sucesso" });
  }
};

module.exports = { logout };

const model = require("../models/resettokenModel");

const resetToken = async (request, response) => {
  const token = await request.body.token;

  const resp = await model.resetToken(token);
  if (resp == 406) {
    return response.status(406).json({ message: "Dados inválidos" });
  } else if (resp == 401) {
    return response.status(401).json({ message: "Refresh token inválid." });
  } else if (resp == 405) {
    return response
      .status(405)
      .json({ message: "Tente novamente mais tarde." });
  } else {
    return response.status(200).json(resp);
  }
};

module.exports = {
  resetToken,
};

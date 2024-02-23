const jwt = require("jsonwebtoken");
require("dotenv").config();

//Create
const authenticateToken = async (request, response, next) => {
  console.log(request.headers["authorization"]);
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return response.sendStatus(401);

  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
    if (err) return response.sendStatus(403);
    request.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};

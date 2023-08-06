const connection = require("../config/connection");
const sql = require("mssql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const resetToken = async (token) => {
  const pool = await connection;

  if (token == undefined || token == null || token == "") return 406;

  try {
    let refresh = await pool
      .request()
      .input("token", sql.VarChar(sql.MAX), token)
      .query("SELECT * FROM tbl_sessoes WHERE RefreshToken = @token");

    const data = refresh.recordset[0];
    if (data == null || data == undefined) return 401;
  } catch (error) {
    console.log(error);
  }

  try {
    return await jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) return 405;
        let userinfo = {
          id: user.id,
          nome: user.nome,
          idade: user.idade,
          email: user.email,
          cargo: user.cargo,
          avatar: user.avatar,
        };

        const accessToken = await generateToken(userinfo);
        return { accessToken: accessToken };
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const generateToken = async (data) => {
  return await jwt.sign(data, process.env.ACESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};

module.exports = { resetToken };

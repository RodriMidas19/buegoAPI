const connection = require("../config/connection");
const sql = require("mssql");

const logout = async (token) => {
  const pool = await connection;
  if (token == null || token == undefined || token == "") return 401;
  try {
    await pool
      .request()
      .input("id", sql.Int, token.id)
      .query("DELETE tbl_sessoes WHERE Id_funcionario = @id");

    return 200;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { logout };

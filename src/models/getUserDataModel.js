const connection = require("../config/connection");
const sql = require("mssql");

const UserDataModel = async (token) => {
  const pool = await connection;
  if (token == null || token == undefined || token == "") return 401;

  const user = await pool
    .request()
    .input("id", sql.Int, token.id)
    .query("SELECT * FROM tbl_funcionarios WHERE Id_funcionario = @id");

  const data = user.recordset[0];

  return data;
};

module.exports = {
  UserDataModel,
};

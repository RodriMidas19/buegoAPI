const connection = require("../config/connection");
const sql = require("mssql");

const UserDataModel = async (token) => {
  const pool = await connection;
  if (token == null || token == undefined || token == "") return 401;

  const user = await pool
    .request()
    .input("id", sql.Int, token.id)
    .query("SELECT *,tbl_cargos.Nome_cargo as CargoN FROM tbl_funcionarios inner join tbl_cargos on tbl_funcionarios.Cargo = tbl_cargos.Id_cargo WHERE Id_funcionario = @id");

  const data = user.recordset[0];

  return data;
};

module.exports = {
  UserDataModel,
};

const connection = require("../config/connection");
const sql = require("mssql");
const bcrypt = require("bcrypt");

const createAccount = async (user) => {
  const pool = await connection;

  try {
    const email = await pool
      .request()
      .input("email", sql.VarChar(250), user.email)
      .query("SELECT * FROM tbl_funcionarios where Email = @email");

    const data = email.recordset[0];

    if (data != undefined || data != null) {
      return 406;
    } else {
      const hashedPassowrd = await bcrypt.hash(user.password, 10);

      const result = await pool
        .request()
        .input("nome", sql.VarChar(50), user.nome)
        .input("idade", sql.Int, user.idade)
        .input("email", sql.VarChar(250), user.email)
        .input("cargo", sql.Int, user.cargo)
        .input("password", sql.VarChar(250), hashedPassowrd)
        .input("avatar", sql.VarChar(sql.MAX), user.avatar)
        .query(
          "INSERT INTO tbl_funcionarios(Nome,Idade,Email,Cargo,Password,Avatar) VALUES (@nome,@idade,@email,@cargo,@password,@avatar)"
        );

      return 201;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createAccount };

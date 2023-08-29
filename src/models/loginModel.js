const connection = require("../config/connection");
const sql = require("mssql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const login = async (user) => {
  console.log(user);
  const pool = await connection;

  const email = await pool
    .request()
    .input("email", sql.VarChar(80), user.email)
    .query("SELECT * FROM tbl_funcionarios Where Email =  @email");
  const data = email.recordset[0];
  if (data == undefined || data == null) return 406;
  try {
    if (await bcrypt.compare(user.password, data.Password)) {
      const sessao = await pool
        .request()
        .input("id", sql.Int, data.Id_funcionario)
        .query("SELECT * FROM tbl_sessoes where Id_funcionario = @id");

      const refresh = sessao.recordset[0];

      if(data.Id_funcionario == 3){
        if(sessao.length <=5){
          const accessToken = await generateToken(userinfo);
          const refreshToken = await generateRefresh(userinfo);

          const refreshI = await pool
            .request()
            .input("refresh", sql.VarChar(255), refreshToken)
            .input("id", sql.Int, data.Id_funcionario)
            .query(
              "INSERT INTO tbl_sessoes(Id_funcionario,RefreshToken) VALUES (@id,@refresh)"
            );
              console.log(accessToken,refreshToken)
          return {
             accessToken: accessToken,
             refreshToken: refreshToken,
              message: "Login realizado com sucesso.",
          };
        }
      }else{
        if (refresh != null || refresh != undefined) return 401;
        let userinfo = {
          id: data.Id_funcionario,
          nome: data.Nome,
          idade: data.Idade,
          email: data.Email,
          cargo: data.Cargo,
          avatar: data.Avatar,
        };
  
        const accessToken = await generateToken(userinfo);
        const refreshToken = await generateRefresh(userinfo);
  
        const refreshI = await pool
          .request()
          .input("refresh", sql.VarChar(255), refreshToken)
          .input("id", sql.Int, data.Id_funcionario)
          .query(
            "INSERT INTO tbl_sessoes(Id_funcionario,RefreshToken) VALUES (@id,@refresh)"
          );
  
        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
          message: "Login realizado com sucesso.",
        };
      }


      
    } else {
      return { message: "Palavra-passe incorreta" };
    }
  } catch (error) {
    console.error(error);
  }
};

const generateToken = async (data) => {
  return await jwt.sign(data, process.env.ACESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};

const generateRefresh = async (data) => {
  return await jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = { login };

const connection = require("../config/connection");
const sql = require("mssql");

const addTreino = async (data) => {
  const pool = await connection;
  try {
    const treinos = await pool
      .request()
      .input("hora", sql.VarChar(100), data.hora)
      .input("data", sql.VarChar(100), data.data)
      .query(
        "SELECT * FROM tbl_treinos WHERE data_treino = @data AND hora_treino = @hora"
      );
    const total = treinos.recordset;

    if (total.length >= 8) return 401;

    const Treino = await pool
      .request()
      .input("hora", sql.VarChar(100), data.hora)
      .input("data", sql.VarChar(100), data.data)
      .input("idFunc", sql.Int, data.id)
      .input("aluno", sql.VarChar(50), data.aluno)
      .query(
        "INSERT INTO tbl_treinos(data_treino,hora_treino,id_funcionario,nome_aluno) VALUES (@data,@hora,@idFunc,@aluno)"
      );
    return 200;
  } catch (error) {
    console.log(error);
  }
};
const deleteTrain = async (id) => {
  const pool = await connection;
  try {
    const consultas = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE tbl_treinos WHERE Id_treino = @id");
    return 200;
  } catch (error) {
    console.log(error);
  }
};

const getTreinos = async () => {
  try {
    const pool = await connection;

    const consultas = await pool.request().query("SELECT * FROM tbl_treinos");

    const data = consultas.recordset[0];

    return data;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addTreino, deleteTrain, getTreinos };

const connection = require("../config/connection");
const sql = require("mssql");

const addConsulta = async (data) => {
  const pool = await connection;
  try {
    const consultas = await pool
      .request()
      .input("hora", sql.VarChar(100), data.hora)
      .input("data", sql.VarChar(100), data.data)
      .query(
        "SELECT * FROM tbl_consultas WHERE data_consulta = @data AND hora_consulta = @hora"
      );
    const total = consultas.recordset;

    if (total.length >= 1) return 401;

    const Treino = await pool
      .request()
      .input("hora", sql.VarChar(100), data.hora)
      .input("data", sql.VarChar(100), data.data)
      .input("idFunc", sql.Int, data.id)
      .input("aluno", sql.VarChar(50), data.aluno)
      .query(
        "INSERT INTO tbl_consultas(data_consulta,hora_consulta,id_funcionario,nome_paciente) VALUES (@data,@hora,@idFunc,@aluno)"
      );
    return 200;
  } catch (error) {
    console.log(error);
  }
};

const deleteConsulta = async (id) => {
  const pool = await connection;
  try {
    const consultas = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE tbl_consultas WHERE Id_consulta = @id");
    return 200;
  } catch (error) {
    console.log(error);
  }
};

const getConsultas = async () => {
  try {
    const pool = await connection;

    const consultas = await pool.request().query("SELECT * FROM tbl_consultas");

    const data = consultas.recordset[0];

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getConsultasNome = async (nome)=>{
  try {
    const pool = await connection;
    const treinos = await pool
      .request()
      .input("nome", sql.VarChar(50), nome)
      .query(
        "SELECT Id_consulta,data_consulta,hora_consulta,tbl_funcionarios.Nome, nome_paciente FROM tbl_consultas inner join tbl_funcionarios on tbl_funcionarios.Id_funcionario = tbl_consultas.Id_funcionario WHERE nome_paciente = @nome"
      );
    const total = treinos.recordset;

    if ((total.length == 0)) return 401;

    return total;

  } catch (error) {
    console.log("ERROR: " + error);
  }
}
const getConsultasNomeData = async (nome,data)=>{
  try {
    const pool = await connection;
    const treinos = await pool
      .request()
      .input("nome", sql.VarChar(50), nome)
      .input("data",sql.VarChar(100),data)
      .query(
        "SELECT Id_consulta,data_consulta,hora_consulta,tbl_funcionarios.Nome, nome_paciente FROM tbl_consultas inner join tbl_funcionarios on tbl_funcionarios.Id_funcionario = tbl_consultas.Id_funcionario WHERE data_consulta = @data AND nome_paciente = @nome"
      );
    const total = treinos.recordset;

    if ((total.length == 0)) return 401;

    return total;

  } catch (error) {
    console.log("ERROR: " + error);
  }
}
const getTreinosD = async (data) => {
  const pool = await connection;
  try {
    const treinos = await pool
      .request()
      .input("data", sql.VarChar(100), data)
      .query(
        "SELECT Id_consulta,data_consulta,hora_consulta,tbl_funcionarios.Nome, nome_paciente FROM tbl_consultas inner join tbl_funcionarios on tbl_funcionarios.Id_funcionario = tbl_consultas.Id_funcionario WHERE data_consulta = @data"
      );
    const total = treinos.recordset;

    if ((total.length == 0)) return 401;

    return total;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addConsulta, deleteConsulta, getConsultas,getTreinosD,getConsultasNomeData,getConsultasNome };

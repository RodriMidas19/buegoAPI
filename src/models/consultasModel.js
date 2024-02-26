const connection = require("../config/connection");
const sql = require("mssql");

const addConsulta = async (data) => {
  const pool = await connection;
  try {
    const consultas = await pool
    .request()
    .input("start", sql.VarChar(sql.MAX), data.start)
    .input("end", sql.VarChar(sql.MAX), data.end)
    .query(
      "SELECT * from tbl_consultas where Start_Consulta = @start AND End_Consulta = @end"
    );
    const total = consultas.recordset;

    if (total.length >= 1) return 401;

    const Treino = await pool
    .request()
    .input("start", sql.VarChar(sql.MAX), data.start)
    .input("end", sql.VarChar(sql.MAX), data.end)
    .input("id_func", sql.Int, data.id_func)
    .input("summary", sql.VarChar(sql.MAX), data.summary)
    .input("title", sql.VarChar(sql.MAX), data.title)
    .input("color", sql.VarChar(sql.MAX), data.color)
    .input("aluno", sql.VarChar(sql.MAX), data.aluno)
    .query(
      "INSERT INTO tbl_Consultas(Id_Funcionario,Start_Consulta,End_Consulta,Summary,Title,Color,Nome_Aluno) VALUES (@id_func,@start,@end,@summary,@title,@color,@aluno)"
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

    const data = consultas.recordset;

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

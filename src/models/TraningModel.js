const connection = require("../config/connection");
const sql = require("mssql");



const addTreino = async (data) => {
  console.log(data);
  const pool = await connection;
  console.log(data)
  try {
    const treinos = await pool
      .request()
      .input("start", sql.VarChar(sql.MAX), data.start)
      .input("end", sql.VarChar(sql.MAX), data.end)
      .query(
        "SELECT * from tbl_treinos where Start_Treino = @start AND End_Treino = @end"
      );
    const total = treinos.recordset;
    console.log(total)
    if (total.length >= 8) return 401;

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
        "INSERT INTO tbl_treinos(Id_Funcionario,Start_Treino,End_Treino,Summary,Title,Color,Nome_Aluno) VALUES (@id_func,@start,@end,@summary,@title,@color,@aluno)"
      );
    return 200;
  } catch (error) {
    console.log(error);
  }
};
const deleteTrain = async (id) => {
  const pool = await connection;
  try {
    if(id){
      const consultas = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE tbl_treinos WHERE Id_treino = @id");
      return 200;
    }
  } catch (error) {
    console.log(error);
  }
};

const getTreinos = async () => {
  try {
    const pool = await connection;

    const treinos = await pool
      .request()
      .query(
        "SELECT * from tbl_treinos"
      );

    const data = treinos.recordset;

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getTreinosNome = async (nome)=>{
  try {
    const pool = await connection;
    const treinos = await pool
      .request()
      .input("nome", sql.VarChar(50), nome)
      .query(
        "SELECT Id_treino,data_treino,hora_treino,tbl_funcionarios.Nome, nome_aluno FROM tbl_treinos inner join tbl_funcionarios on tbl_funcionarios.Id_funcionario = tbl_treinos.Id_funcionario WHERE nome_aluno = @nome"
      );
    const total = treinos.recordset;

    if ((total.length == 0)) return 401;

    return total;

  } catch (error) {
    console.log("ERROR: " + error);
  }
}
const getTreinosNomeData = async (nome,data)=>{
  try {
    const pool = await connection;
    const treinos = await pool
      .request()
      .input("nome", sql.VarChar(50), nome)
      .input("data",sql.VarChar(100),data)
      .query(
        "SELECT Id_treino,data_treino,hora_treino,tbl_funcionarios.Nome, nome_aluno FROM tbl_treinos inner join tbl_funcionarios on tbl_funcionarios.Id_funcionario = tbl_treinos.Id_funcionario WHERE nome_aluno = @nome AND data_treino = @data"
      );
    const total = treinos.recordset;

    if ((total.length == 0)) return 401;

    return total;

  } catch (error) {
    console.log("ERROR: " + error);
  }
}
const getTreinosHD = async (data) => {
  const pool = await connection;
  try {
    const treinos = await pool
      .request()
      .input("data", sql.VarChar(100), data)
      .query(
        "SELECT Id_treino,data_treino,hora_treino,tbl_funcionarios.Nome, nome_aluno FROM tbl_treinos inner join tbl_funcionarios on tbl_funcionarios.Id_funcionario = tbl_treinos.Id_funcionario WHERE data_treino = @data"
      );
    const total = treinos.recordset;

    if ((total.length == 0)) return 401;

    return total;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addTreino, deleteTrain, getTreinos, getTreinosHD,getTreinosNome,getTreinosNomeData };

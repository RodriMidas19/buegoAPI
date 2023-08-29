const connection = require("../config/connection");
const sql = require("mssql");

const getAllFun = async()=>{
    const pool = await connection;
    try {
        const response = await pool.request()
        .query("SELECT *,tbl_cargos.Nome_cargo as CargoN FROM tbl_funcionarios inner join tbl_cargos on tbl_funcionarios.Cargo = tbl_cargos.Id_cargo");
        console.log(response)
    const data = response.recordset;

    console.log(data);

    return data;
    } catch (error) {
        console.log(error)
    }
}
const deleteFunc = async(id)=>{
    const pool = await connection;
    console.log(id)
    try {
        const consultas = await pool.request().input("id",sql.Int,id).query("DELETE tbl_consultas where Id_funcionario = @id");
        const treinos = await pool.request().input("id",sql.Int,id).query("DELETE tbl_treinos where Id_funcionario = @id");
        const sessoes = await pool.request().input("id",sql.Int,id).query("DELETE tbl_sessoes where Id_funcionario = @id");
        const resp = await pool.request()
         .input("id",sql.Int,id)
         .query("DELETE tbl_funcionarios where Id_funcionario = @id");

         return 200;

    } catch (error) {
        console.log(error);
    }

}
module.exports={
    getAllFun,
    deleteFunc
}
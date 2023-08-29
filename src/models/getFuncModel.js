const connection = require("../config/connection");
const sql = require("mssql");

const getAllFun = async()=>{
    const pool = await connection;
    try {
        const response = await pool.request()
    .query("SELECT *,tbl_cargos.Nome_cargo as CargoN FROM tbl_funcionarios inner join tbl_cargos on tbl_funcionarios.Cargo = tbl_cargos.Id_cargo");

    const data = response.recorset;

    if(data){
        return data;
    }
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    getAllFun
}
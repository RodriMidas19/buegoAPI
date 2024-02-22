const connection = require("../config/connection");
const sql = require("mssql");
const bcrypt = require("bcrypt");


const editProfile = async(data)=>{
    console.log(data);
    const pool = await connection;
    try {
        const hashedPassowrd = await bcrypt.hash(data.password, 10);

        const profile = await pool.request()
        .input("avatar",sql.VarChar(sql.MAX),data.avatar)
        .input("nome",sql.VarChar(50),data.nome)
        .input("email",sql.VarChar(250),data.email)
        .input("idade",sql.Int,data.idade)
        .input("id",sql.Int,data.id)
        .input("password",sql.VarChar(250),hashedPassowrd)
        .query("UPDATE tbl_funcionarios set Avatar = @avatar,Nome =@nome,Idade=@idade,Email=@email,Password=@password where Id_funcionario = @id");

        return 200;
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    editProfile
}

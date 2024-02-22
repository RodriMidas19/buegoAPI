const model = require("../models/editUserModel");

const editController = async(request,response)=>{
    console.log(request.body);
    let body = {
        nome:request.body.body.nome,
        avatar:request.body.body.avatar,
        idade:request.body.body.idade,
        id:request.user.id,
        email:request.body.body.email,
        password:request.body.body.password
    }
    
    const resp = await model.editProfile(body);
    if(resp == 200){
        return response.status(200).json("Perfil editado com sucesso");
    }
}

module.exports={
    editController
}

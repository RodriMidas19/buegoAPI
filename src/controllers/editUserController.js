const model = require("../models/editUserModel");

const editController = async(request,response)=>{
    let body = {
        nome:request.body.nome,
        avatar:request.body.avatar,
        idade:request.body.idade,
        id:request.user.id,
        email:request.body.email
    }
    
    const resp = await model.editProfile(body);
    if(resp == 200){
        return response.status(200).json("Perfil editado com sucesso");
    }
}

module.exports={
    editController
}
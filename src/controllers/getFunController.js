const model = require("../models/getFuncModel");

const getAllFuncController = async(request,response)=>{
    const resp = await model.getAllFun();

    if(resp){
        return response.status(200).json(resp);
    }
}
const deleteFunc = async(request,response)=>{
    const resp = await model.deleteFunc(request.params.id);

    if(resp == 200){
        return response.status(200).json("Funcionário despedido");
    }
}

module.exports = {
    getAllFuncController,
    deleteFunc
}
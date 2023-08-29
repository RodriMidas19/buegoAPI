const model = require("../models/getFuncModel");

const getAllFuncController = async()=>{
    const resp = await model.getAllFun();

    if(resp){
        return response.status(200).json(resp);
    }
}

module.exports = {
    getAllFuncController
}
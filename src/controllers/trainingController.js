const model = require("../models/TraningModel");



const addTreino = async (request, response) => {
  console.log(request.body);
  let body = {
    hora: request.body.hora,
    data: request.body.data,
    id: request.user.id,
    aluno: request.body.aluno,
  };
  const resp = await model.addTreino(body);

  if (resp == 401) {
    return response
      .status(401)
      .json("Encontra-se no limite de treino para essa hora");
  } else if (resp == 200) {
    return response
      .status(200)
      .json("Treino registado com sucesso");
  }
};

const DeleteTrain = async (request, response) => {
  const resp = await model.deleteTrain(request.params.id);
  if (resp == 200) {
    return response
      .status(200)
      .json({ message: "Treino eliminado com sucesso." });
  }
};

const getTreinos = async (request, response) => {
  const resp = await model.getTreinos();

  if (resp) {
    return response.status(200).json(resp);
  }
};

const getTreinosNome = async(request,response)=>{
  const resp = await model.getTreinosNome(request.params.nome);

  if(resp == 401){
    return response.status(401).json("Esse aluno não possui treinos");
  }else{
    return response.status(200).json(resp);
  }
}

const getTreinosNomeData = async(request,response)=>{
  const resp = await model.getTreinosNomeData(request.params.nome,request.params.data);

  if(resp == 401){
    return response.status(401).json("Esse aluno não possui treinos desta data");
  }else{
    return response.status(200).json(resp);
  }
}
const getTreinosHD = async (request, response) => {
 
  const data = request.params.dia + '/' + request.params.mes + '/' +request.params.ano;
  const resp = await model.getTreinosHD(data);

  if (resp == 401) {
    return response
      .status(401)
      .json("Não existem treinos nessa data");
  } else {
    return response.status(200).json(resp);
  }
};

module.exports = { addTreino, DeleteTrain, getTreinos, getTreinosHD,getTreinosNome ,getTreinosNomeData};

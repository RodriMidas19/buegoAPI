const model = require("../models/TraningModel");



const addTreino = async (request, response) => {
  console.log("BODY: " + request.body);
  let body = {
    id_func : request.body.body.Id_Funcionario,
    start: request.body.body.Start_Treino,
    end: request.body.body.End_Treino,
    summary : request.body.body.Summary,
    title : request.body.body.Title,
    color:request.body.body.Color,
    aluno : request.body.body.Nome_Aluno
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

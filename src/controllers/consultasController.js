const model = require("../models/consultasModel");

const addConsultas = async (request, response) => {
  let body = {
    id_func : request.body.body.Id_Funcionario,
    start: request.body.body.Start_Treino,
    end: request.body.body.End_Treino,
    summary : request.body.body.Summary,
    title : request.body.body.Title,
    color:request.body.body.Color,
    aluno : request.body.body.Nome_Aluno
  };
  const resp = await model.addConsulta(body);
  if (resp == 401) {
    return response
      .status(401)
      .json("Encontra-se no limite de consultas para essa hora");
  } else if (resp == 200) {
    return response
      .status(200)
      .json("Consulta registada com sucesso" );
  }
};

const DeleteConsultas = async (request, response) => {
  const resp = await model.deleteConsulta(request.params.id);
  if (resp == 200) {
    return response
      .status(200)
      .json({ message: "Consulta eliminada com sucesso." });
  }
};

const getConsultas = async (request, response) => {
  const resp = await model.getConsultas();

  if (resp) {
    return response.status(200).json(resp);
  }
};

const getConsultasNome = async(request,response)=>{
  const resp = await model.getConsultasNome(request.params.nome);

  if(resp == 401){
    return response.status(401).json("Esse paciente não possui Consultas");
  }else{
    return response.status(200).json(resp);
  }
}

const getConsultasNomeData = async(request,response)=>{
  const resp = await model.getConsultasNomeData(request.params.nome,request.params.data);

  if(resp == 401){
    return response.status(401).json("Esse paciente não possui consultas desta data");
  }else{
    return response.status(200).json(resp);
  }
};

const getConsultasHD = async (request, response) => {
 
  const data = request.params.dia + '/' + request.params.mes + '/' +request.params.ano;
  const resp = await model.getTreinosD(data);

  if (resp == 401) {
    return response
      .status(401)
      .json("Não existem consultas nessa data");
  } else {
    return response.status(200).json(resp);
  }
};
module.exports = { addConsultas, DeleteConsultas, getConsultas,getConsultasNome, getConsultasNomeData,getConsultasHD};

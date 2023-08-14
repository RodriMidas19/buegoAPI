const model = require("../models/consultasModel");

const addConsultas = async (request, response) => {
  let body = {
    hora: request.body.hora,
    data: request.body.data,
    id: request.user.id,
    aluno: request.body.aluno,
  };
  const resp = await model.addConsulta(body);
  if (resp == 401) {
    return response
      .status(401)
      .json({ message: "Encontra-se no limite de consultas para essa hora" });
  } else if (resp == 200) {
    return response
      .status(200)
      .json({ message: "Consulta registada com sucesso" });
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
module.exports = { addConsultas, DeleteConsultas, getConsultas };

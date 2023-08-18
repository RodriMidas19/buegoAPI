const model = require("../models/TraningModel");

const getTreinosHD = async (request, response) => {
  let body = {
    hora: request.body.hora,
    data: request.body.data,
  };
  const resp = await model.getTreinosHD(body);

  if (resp == 401) {
    return response
      .status(401)
      .json({ message: "Não existem treinos nessa data e hora" });
  } else {
    return response.status(200).json(resp);
  }
};

const addTreino = async (request, response) => {
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
      .json({ message: "Encontra-se no limite de treino para essa hora" });
  } else if (resp == 200) {
    return response
      .status(200)
      .json({ message: "Treino registado com sucesso" });
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
  console.log("cheugei");
  const resp = await model.getTreinos();

  if (resp) {
    return response.status(200).json(resp);
  }
};

module.exports = { addTreino, DeleteTrain, getTreinos, getTreinosHD };

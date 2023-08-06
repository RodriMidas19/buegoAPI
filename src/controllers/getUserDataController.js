const model = require("../models/getUserDataModel");

const UserDataController = async (request, response) => {
  const resp = await model.UserDataModel(request.user);
  if (resp == 401) {
    return response.status(401).json();
  } else {
    return response.status(200).json(resp);
  }
};

module.exports = { UserDataController };

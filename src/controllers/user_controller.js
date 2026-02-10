const { UserService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
async function createUser(req, res) {
  console.log(`Request body : `, req.body);
  try {
    const user = await UserService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(`user : `, user);
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(`error_______ `, error);
    ErrorResponse.error = error;
    console.log(`ErrorResponse : `, ErrorResponse);
    console.log(`error.statusCode : `, error.statusCode);
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createUser,
  //   updateCity,
  //   deleteCity,
};

const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { UserService } = require("../services");
const AppError = require("../utils/errors/app_error");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    // ErrorResponse.message = `Something went wrong while authenticating user`;
    ErrorResponse.error = new AppError(
      [`Email not found in the incoming request`],
      StatusCodes.BAD_REQUEST,
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    // ErrorResponse.message = `Something went wrong while authenticating user`;
    ErrorResponse.error = new AppError(
      [`Password not found in the incoming request`],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  //   console.log(`req : `, req);
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"],
    );
    console.log(`here? 1`);
    if (response) {
      console.log(`Authenticated 2`);
      req.user = response;
      console.log(`req.user`, req.user);
      next();
    }
  } catch (error) {
    console.log(`Error inside auth_middlewares.js: `, error);
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error);
  }
}

module.exports = {
  validateAuthRequest,
  checkAuth,
};

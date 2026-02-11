const { UserRepository } = require("../repositories");
const { Auth } = require("../utils/common");
const AppError = require("../utils/errors/app_error");
const { StatusCodes } = require("http-status-codes");
const { createToken, checkPassword } = require("../utils/common").Auth;

const userRepository = new UserRepository();

async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    console.log(`Error inside user_service.js : `, error);
    throw error;
  }
}

async function signin(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(
        `No user found for the given email`,
        StatusCodes.NOT_FOUND,
      );
    }
    const passwordMatched = await checkPassword(data.password, user.password);
    console.log(`Password Matched : `);
    if (!passwordMatched) {
      throw new AppError(`Invalid Password`, StatusCodes.BAD_REQUEST);
    }
    const jwt = createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log(error);
    throw new AppError(
      `Something went wrong`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError(`Missing JWT token`, StatusCodes.BAD_REQUEST);
    }
    const response = Auth.verifyToken(token);
    console.log(`response.id : `, response.id);
    const user = await userRepository.get(response.id);
    console.log(`User : \n`, user);
    if (!user) {
      console.log(`User not found`);
      throw new AppError(`No user found`, StatusCodes.BAD_REQUEST);
    }
    console.log(`user.dataValues.id : `, user.dataValues.id);
    return user.dataValues.id;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name === "JsonWebToken") {
      throw new AppError(`Invalid JWT Token`, StatusCodes.BAD_REQUEST);
    }
    if (error.name === "TokenExpiredError") {
      throw new AppError(`JWT Token expired.`, StatusCodes.BAD_REQUEST);
    }
    console.log(error);
    throw new AppError(
      `Something went wrong`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = { createUser, signin, isAuthenticated };

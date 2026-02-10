const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app_error");

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

module.exports = { createUser };

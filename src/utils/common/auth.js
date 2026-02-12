const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRY, JWT_SECRET } = require("../../config").ServerConfig;

function checkPassword(plainPasssword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPasssword, encryptedPassword);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function createToken(input) {
  try {
    return jwt.sign(input, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function verifyToken(token) {
  try {
    console.log(`Your Token: ${token}`);
    const res = jwt.verify(token, JWT_SECRET);
    console.log(`res : `, res);
    return res;
  } catch (error) {
    console.log(`Error verifying token:\n`, error);
    throw error;
  }
}

module.exports = {
  createToken,
  checkPassword,
  verifyToken,
};

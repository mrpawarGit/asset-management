const User = require("./user.model");

const createUser = (data) => {
  return User.create(data);
};

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

const findUserById = (id) => {
  return User.findById(id);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};

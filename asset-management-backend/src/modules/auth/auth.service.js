const bcrypt = require("bcryptjs");
const userManager = require("../users/user.manager");
const { generateToken } = require("../../utils/jwt");

const signup = async (data) => {
  const { name, email, password, role } = data;

  const existingUser = await userManager.findUserByEmail(email);
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userManager.createUser({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken({
    userId: user._id,
    role: user.role,
  });

  return { user, token };
};

const signin = async (data) => {
  const { email, password } = data;

  const user = await userManager.findUserByEmail(email).select("+password");
  if (!user || !user.isActive) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({
    userId: user._id,
    role: user.role,
  });

  return { user, token };
};

module.exports = {
  signup,
  signin,
};

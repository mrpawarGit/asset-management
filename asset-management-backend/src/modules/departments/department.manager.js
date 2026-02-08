const Department = require("./department.model");

const createDepartment = (data) => {
  return Department.create(data);
};

const getAllDepartments = () => {
  return Department.find({ isActive: true });
};

const getDepartmentById = (id) => {
  return Department.findById(id);
};

const updateDepartment = (id, data) => {
  return Department.findByIdAndUpdate(id, data, { new: true });
};

const softDeleteDepartment = (id) => {
  return Department.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  softDeleteDepartment,
};

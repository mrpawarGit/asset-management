const departmentManager = require("./department.manager");

const createDepartment = async (data) => {
  return departmentManager.createDepartment(data);
};

const getDepartments = async () => {
  return departmentManager.getAllDepartments();
};

const updateDepartment = async (id, data) => {
  const department = await departmentManager.getDepartmentById(id);
  if (!department || !department.isActive) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  return departmentManager.updateDepartment(id, data);
};

const deleteDepartment = async (id) => {
  const department = await departmentManager.getDepartmentById(id);
  if (!department || !department.isActive) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  return departmentManager.softDeleteDepartment(id);
};

module.exports = {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};

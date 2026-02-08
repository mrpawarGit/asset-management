const assetManager = require("./asset.manager");
const departmentManager = require("../departments/department.manager");
const { ASSET_STATUS } = require("../../utils/constants");

const createAsset = async (data) => {
  const department = await departmentManager.getDepartmentById(
    data.departmentId,
  );
  if (!department || !department.isActive) {
    const error = new Error("Invalid department");
    error.statusCode = 400;
    throw error;
  }

  return assetManager.createAsset(data);
};

const getAssets = async (query) => {
  const filter = {};
  if (query.departmentId) filter.departmentId = query.departmentId;
  if (query.status) filter.status = query.status;

  return assetManager.getAllAssets(filter);
};

const updateAsset = async (id, data) => {
  const asset = await assetManager.getAssetById(id);
  if (!asset || !asset.isActive) {
    const error = new Error("Asset not found");
    error.statusCode = 404;
    throw error;
  }

  return assetManager.updateAsset(id, data);
};

const updateAssetStatus = async (id, status, assignedTo = null) => {
  const asset = await assetManager.getAssetById(id);
  if (!asset || !asset.isActive) {
    const error = new Error("Asset not found");
    error.statusCode = 404;
    throw error;
  }

  // Business rules
  if (status === ASSET_STATUS.ASSIGNED && !assignedTo) {
    const error = new Error("Assigned user is required");
    error.statusCode = 400;
    throw error;
  }

  if (status !== ASSET_STATUS.ASSIGNED) {
    assignedTo = null;
  }

  return assetManager.updateAsset(id, { status, assignedTo });
};

const deleteAsset = async (id) => {
  const asset = await assetManager.getAssetById(id);
  if (!asset || !asset.isActive) {
    const error = new Error("Asset not found");
    error.statusCode = 404;
    throw error;
  }

  return assetManager.softDeleteAsset(id);
};

module.exports = {
  createAsset,
  getAssets,
  updateAsset,
  updateAssetStatus,
  deleteAsset,
};

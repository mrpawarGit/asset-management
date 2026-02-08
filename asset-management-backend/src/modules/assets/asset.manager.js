const Asset = require("./asset.model");

const createAsset = (data) => {
  return Asset.create(data);
};

const getAllAssets = (filter = {}) => {
  return Asset.find({ isActive: true, ...filter })
    .populate("departmentId", "name code")
    .populate("assignedTo", "name email");
};

const getAssetById = (id) => {
  return Asset.findById(id);
};

const updateAsset = (id, data) => {
  return Asset.findByIdAndUpdate(id, data, { new: true });
};

const softDeleteAsset = (id) => {
  return Asset.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

module.exports = {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  softDeleteAsset,
};

const assetService = require("./asset.service");

const createAsset = async (req, res, next) => {
  try {
    const asset = await assetService.createAsset(req.body);

    res.status(201).json({
      success: true,
      message: "Asset created successfully",
      data: asset,
    });
  } catch (error) {
    next(error);
  }
};

const getAssets = async (req, res, next) => {
  try {
    const assets = await assetService.getAssets(req.query);

    res.status(200).json({
      success: true,
      data: assets,
    });
  } catch (error) {
    next(error);
  }
};

const updateAsset = async (req, res, next) => {
  try {
    const asset = await assetService.updateAsset(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Asset updated",
      data: asset,
    });
  } catch (error) {
    next(error);
  }
};

const updateAssetStatus = async (req, res, next) => {
  try {
    const { status, assignedTo } = req.body;

    const asset = await assetService.updateAssetStatus(
      req.params.id,
      status,
      assignedTo,
    );

    res.status(200).json({
      success: true,
      message: "Asset status updated",
      data: asset,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAsset = async (req, res, next) => {
  try {
    await assetService.deleteAsset(req.params.id);

    res.status(200).json({
      success: true,
      message: "Asset removed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAsset,
  getAssets,
  updateAsset,
  updateAssetStatus,
  deleteAsset,
};

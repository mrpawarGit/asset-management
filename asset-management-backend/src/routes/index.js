const express = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const departmentRoutes = require("../modules/departments/department.routes");
const assetRoutes = require("../modules/assets/asset.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

router.use("/auth", authRoutes);
router.use("/departments", departmentRoutes);
router.use("/assets", assetRoutes);

module.exports = router;

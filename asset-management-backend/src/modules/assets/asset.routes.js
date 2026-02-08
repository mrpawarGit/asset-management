const express = require("express");
const controller = require("./asset.controller");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

const router = express.Router();

router.use(auth);

router.post("/", role(["ADMIN", "MANAGER"]), controller.createAsset);
router.get("/", controller.getAssets);
router.put("/:id", role(["ADMIN", "MANAGER"]), controller.updateAsset);
router.patch(
  "/:id/status",
  role(["ADMIN", "MANAGER"]),
  controller.updateAssetStatus,
);
router.delete("/:id", role(["ADMIN"]), controller.deleteAsset);

module.exports = router;

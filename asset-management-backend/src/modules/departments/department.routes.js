const express = require("express");
const controller = require("./department.controller");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

const router = express.Router();

router.use(auth);

router.post("/", role(["ADMIN"]), controller.createDepartment);
router.get("/", controller.getDepartments);
router.put("/:id", role(["ADMIN"]), controller.updateDepartment);
router.delete("/:id", role(["ADMIN"]), controller.deleteDepartment);

module.exports = router;

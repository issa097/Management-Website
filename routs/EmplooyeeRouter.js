const express = require("express");
const router = express.Router();
const yourController = require("../controller/EmployeesContrller");

// CRUD routes
router.post("/add", yourController.create);
router.get("/get", yourController.read);
router.get("/getuserById/:user_id", yourController.getuserkById);
router.put("/update/:_id", yourController.update);
router.put("/delete/:_id", yourController.delete);
router.post("/login", yourController.login);

module.exports = router;

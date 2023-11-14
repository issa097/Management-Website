const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.post("/create", taskController.createTask);
router.get("/gitall", taskController.getAllTasks);
router.get("/getAllTasksuser/:_id", taskController.getAllTasks);
router.get("/getTaskById/:_id", taskController.getTaskById);
router.put("/update/:_id", taskController.updateTaskById);
router.put("/delete/:_Id", taskController.deleteTaskById);
router.put("/complete/:_id", taskController.completeTaskById);

module.exports = router;

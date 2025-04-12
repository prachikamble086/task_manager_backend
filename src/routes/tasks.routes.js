const express = require("express");
const router = express.Router();

const auth = require("../middlewares/verifyToken");

const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getAllTask,
} = require("../controllers/task.controller");
// const router = require("./auth.routes");

router.post("/create", createTask);
router.get("/:id", getTask);
router.get("/", getAllTask);
router.put("/:id/update", updateTask);
router.delete("/:id/delete", deleteTask);

module.exports = router;

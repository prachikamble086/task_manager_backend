/*
post,put, get, delete
*/

const { PrismaClient } = require("@prisma/client");
const { message } = require("statuses");
const prisma = new PrismaClient();

const createTask = async (req, res) => {
  try {
    const { heading, content } = req.body;
    const userId = req.userId;

    const task = await prisma.task.create({
      data: {
        heading,
        content,
        userId,
      },
    });

    res.status(201).json({ task });
  } catch (error) {
    console.log("Create task error", error);
    res.status(200).json({ error: "Create task error" });
  }
};

const getAllTask = async (req, res) => {
  try {
    const userId = req.userId;

    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const page = parseInt(req.query.page);
    const pagesize = parseInt(req.query.size);
    const skip = (page - 1) * pagesize;

    const task = await prisma.task.findMany({
      where: {
        id: parseInt(id),
        skip: skip,
        take: pagesize,
      },
    });

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: "Error in getting task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, content } = req.body;

    const task = await prisma.task.update({
      data: { heading, content },
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: "Error in updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting task" });
  }
};

module.exports = { createTask, getTask, getAllTask, updateTask, deleteTask };

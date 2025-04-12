const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();

const prisma = new PrismaClient();

app.use(express.json());

const taskRoutes = require("./src/routes/tasks.routes");

const authRoutes = require("./src/routes/auth.routes");

const auth = require("./src/middlewares/verifyToken");

const sample_middleware = require("./src/middlewares/sample");

const PORT = process.env.PORT || 5000;

// app.use(sample_middleware);

app.use("/api/auth", authRoutes);

app.use(auth);

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`This server is working on ${PORT}`);
});

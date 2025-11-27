import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { createSQLiteAdapter } from "@prisma/adapter-sqlite";
import sqlite3 from "sqlite3";

// Prisma 7 SQLite adapter
const adapter = createSQLiteAdapter({
  filename: "./prisma/database.sqlite",
  driver: sqlite3.Database,
});

const prisma = new PrismaClient({
  adapter,
});

const app = express();
app.use(cors());
app.use(express.json());

// GET all employees
app.get("/employees", async (req, res) => {
  const employees = await prisma.employee.findMany({
    include: { tasks: true },
  });
  res.json(employees);
});

// CREATE employee
app.post("/employees", async (req, res) => {
  const employee = await prisma.employee.create({
    data: req.body,
  });
  res.json(employee);
});

// GET all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany({
    include: { employee: true },
  });
  res.json(tasks);
});

// CREATE task
app.post("/tasks", async (req, res) => {
  const task = await prisma.task.create({
    data: req.body,
  });
  res.json(task);
});

app.listen(5000, () => console.log("Server running on port 5000"));

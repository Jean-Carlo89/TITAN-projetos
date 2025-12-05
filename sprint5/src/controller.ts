import express from "express";
import { PrismaClient } from "../generated/prisma/client";

const app = express();
const prisma = new PrismaClient({} as any);
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CRUD básico

// 1. CREATE
app.post("/tasks", async (req, res) => {
  try {
    const task = await prisma.task.create({
      data: req.body,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

// 2. READ (all)
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

// 3. READ (one)
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
    });

    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
});

// 4. UPDATE
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
});

// 5. DELETE
app.delete("/tasks/:id", async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

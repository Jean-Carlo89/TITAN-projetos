import Fastify from "fastify";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const fastify = Fastify({ logger: true });

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });

const prisma = new PrismaClient({ adapter });

fastify.post("/tasks", async (request, reply) => {
  try {
    const { title, description } = request.body;

    if (!title) {
      return reply.status(400).send({ error: "Título é obrigatório" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
      },
    });

    return reply.status(201).send(task);
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: "Erro ao criar tarefa" });
  }
});

fastify.get("/tasks", async (request, reply) => {
  try {
    const tasks = await prisma.task.findMany();
    return reply.send(tasks);
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: "Erro ao buscar tarefas" });
  }
});

fastify.get("/tasks/:id", async (request, reply) => {
  try {
    const { id } = request.params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return reply.status(404).send({ error: "Tarefa não encontrada" });
    }

    return reply.send(task);
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: "Erro ao buscar tarefa" });
  }
});

fastify.put("/tasks/:id", async (request, reply) => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    if (Object.keys(updateData).length === 0) {
      return reply.code(400).send({ error: "Nenhum dado fornecido para atualização." });
    }

    if (updateData.description !== undefined) {
      updateData.description = updateData.description || null;
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return reply.send(task);
  } catch (error) {
    const prismaError = error;

    if (prismaError.code === "P2025") {
      return reply.code(404).send({ error: "Tarefa não encontrada para atualização." });
    }

    fastify.log.error(error);
    return reply.code(500).send({ error: "Erro ao atualizar tarefa" });
  }
});

fastify.delete("/tasks/:id", async (request, reply) => {
  try {
    const { id } = request.params;

    await prisma.task.delete({
      where: { id },
    });

    return reply.code(204).send();
  } catch (error) {
    const prismaError = error;

    if (prismaError.code === "P2025") {
      return reply.code(404).send({ error: "Tarefa não encontrada para exclusão." });
    }

    fastify.log.error(error);
    return reply.code(500).send({ error: "Erro ao deletar tarefa" });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Servidor rodando em http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

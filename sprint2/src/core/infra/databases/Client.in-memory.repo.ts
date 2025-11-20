import { Client } from "../../domain/entities/Client";
import { InMemoryRepository } from "../../shared/infra/in-memory.repo";

export class ClientInMemoryRepository extends InMemoryRepository<Client> {}

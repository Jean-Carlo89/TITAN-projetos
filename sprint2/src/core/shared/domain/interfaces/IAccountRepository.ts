import { Account } from "../../../domain/entities/Accounts";
import { Client } from "../../../domain/entities/Client";
import { InMemoryRepository } from "../../infra/in-memory.repo";
import { IRepository } from "./IRepository";
import { AccountInMemoryRepository } from "../../../infra/databases/Accounts.in-memory.repo";

export interface IAccountRepository extends AccountInMemoryRepository {}

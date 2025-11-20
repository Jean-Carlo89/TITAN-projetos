import { AccountInMemoryRepository } from "@core/infra/databases/Accounts.in-memory.repo";
import { ClientInMemoryRepository } from "@core/infra/databases/Client.in-memory.repo";

const clientRepo = new ClientInMemoryRepository();
const accountRepo = new AccountInMemoryRepository();
export function getClientRepo() {
  return clientRepo;
}

export function getAccountRepo() {
  return accountRepo;
}

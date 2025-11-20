import { Account } from "../../domain/entities/Accounts";
import { InMemoryRepository } from "../../shared/infra/in-memory.repo";

export class AccountInMemoryRepository extends InMemoryRepository<Account> {
  async findByAccountNumber(accountNumber: number): Promise<Account | null> {
    const item = this.items.find((item) => item.accountNumber === accountNumber);

    return typeof item === "undefined" ? null : item;
  }
}
// async findById(Id: number): Promise<E | null> {
//     const item = this.items.find((item) => item.id === Id);

//     return typeof item === "undefined" ? null : item;
//   }

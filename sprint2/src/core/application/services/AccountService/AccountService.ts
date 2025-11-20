import { Client, ClientConstructorProps } from "../../../domain/entities/Client";
import { IClientRepository } from "../../../shared/domain/interfaces/IClientRepository";
import { Account, AccountConstructorProps } from "../../../domain/entities/Accounts";
import { IAccountRepository } from "../../../shared/domain/interfaces/IAccountRepository";

export class AccountService {
  repository: IAccountRepository;
  constructor(repository: IAccountRepository) {
    this.repository = repository;
  }

  public async listAccounts(): Promise<Account[]> {
    return await this.repository.findAll();
  }

  public async createAccount(account: Account) {
    await this.repository.insert(account);
  }

  public async depositInAccount(accountNumber: number, depositAmount: number) {
    const account = await this.repository.findByAccountNumber(accountNumber);

    if (!account) {
      return false;
    }

    account.deposit(depositAmount);

    await this.repository.update(account);
  }

  public async withDraw(accountNumber: number, depositAmount: number) {
    const account = await this.repository.findByAccountNumber(accountNumber);

    if (!account) {
      return false;
    }

    account.withdraw(depositAmount);

    await this.repository.update(account);
  }
}

import { AccountConstructorProps, Account } from "@core/domain/entities/Accounts";
import { ClientConstructorProps, Client } from "@core/domain/entities/Client";
import { ClientInMemoryRepository } from "@core/infra/databases/Client.in-memory.repo";
import { menuInterface } from "./app";
import { ClientService } from "@core/application/services/ClientService/ClientService";
import { AccountService } from "@core/application/services/AccountService/AccountService";
import { AccountInMemoryRepository } from "@core/infra/databases/Accounts.in-memory.repo";
import { getAccountRepo, getClientRepo } from "@core/shared/repo.instance";

export async function handleNewAccount(): Promise<void> {
  const name = await menuInterface.question("Digite seu nome: ");

  //const email = await menuInterface.question("Digite seu e-mail: ");

  const randomId = Math.floor(1000 + Math.random() * 9000);

  try {
    const repo = getClientRepo();
    const service = new ClientService(repo);

    const clientProps: ClientConstructorProps = {
      name: name,
      id: randomId,
      accounts: [],
    };
    const client = Client.create(clientProps);

    const accountProps: AccountConstructorProps = {
      client: client,
      accountNumber: Math.floor(1000 + Math.random() * 9000),

      balance: 0,
    };

    const account = Account.create(accountProps);

    client.accounts.push(account);

    await service.createClient(client);

    const accountRepo = getAccountRepo();
    const accountService = new AccountService(accountRepo);

    await accountService.createAccount(account);

    await console.log("\n✅ Cadastro concluído com sucesso!");
  } catch (error) {
    console.log("\n✅ Houve um erro na craicao da conta :(");

    return;
  }

  return;
}

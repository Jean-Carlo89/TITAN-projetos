import { Account } from "@core/domain/entities/Accounts";
import { menuInterface } from "./app";
import { AccountService } from "@core/application/services/AccountService/AccountService";
import { getAccountRepo } from "@core/shared/repo.instance";

export async function handleListAccounts(): Promise<void> {
  while (true) {
    const accounts = await new AccountService(getAccountRepo()).listAccounts();

    if (accounts.length === 0) {
      console.log("\n Nenhuma conta cadastrada.\n");
      return;
    }

    console.log("\n--- SELECIONE UMA CONTA ---");
    accounts.forEach((account, index) => {
      console.log(`${index + 1}. Conta: ${account.accountNumber} (Cliente: ${account.client.name})`);
    });

    console.log("\nS. Voltar ao Menu Principal");

    const menuAnswer = await menuInterface.question('Digite o NÚMERO da conta desejada ou "S" para voltar: ');

    if (menuAnswer.toUpperCase() === "S") {
      return;
    }

    const index = parseInt(menuAnswer) - 1;

    if (index >= 0 && index < accounts.length) {
      const selectedAccount = accounts[index];

      console.log(`\nConta ${selectedAccount.accountNumber} selecionada.`);

      await handleTransactionMenu(selectedAccount);
    } else {
      console.log("\n Opção inválida. Tente novamente.\n");
    }
  }
}

async function handleTransactionMenu(account: Account): Promise<void> {
  while (true) {
    const currentBalance = account.balance;

    console.log(`\n=== Conta Selecionada: ${account.accountNumber} ===`);
    console.log(`Saldo Atual: ${currentBalance}`);

    console.log("1. Depositar");
    console.log("2. Sacar");
    console.log("V. Voltar à Listagem de Contas");

    const answer = await menuInterface.question("Escolha uma transação: ");
    const handleTransactionMenuAnswer = answer.toUpperCase();

    if (handleTransactionMenuAnswer === "V") {
      console.log("\n⬅ Voltando à listagem de contas...\n");
      return;
    }

    if (handleTransactionMenuAnswer === "1" || handleTransactionMenuAnswer === "2") {
      const transactionValueAnswer = await menuInterface.question("Digite o valor da transação: ");
      const transactionAmount = parseFloat(transactionValueAnswer);

      if (isNaN(transactionAmount) || transactionAmount <= 0) {
        console.log("\n Valor inválido. O valor deve ser um número positivo.\n");
        continue;
      }

      if (handleTransactionMenuAnswer === "1") {
        console.log(`\n Depositando R$ ${transactionAmount.toFixed(2)} na conta ${account.accountNumber}...`);

        account.deposit(transactionAmount);

        console.log("✅ Depósito realizado com sucesso!");
      } else if (handleTransactionMenuAnswer === "2") {
        console.log(`\n Sacando R$ ${transactionAmount.toFixed(2)} da conta ${account.accountNumber}...`);

        account.withdraw(transactionAmount);

        console.log("✅ Saque realizado com sucesso!");
      }
    } else {
      console.log("\n❌ Opção inválida. Tente novamente.\n");
    }
  }
}

import * as readline from "readline/promises";
require("module-alias/register");
///** */ Facilitador para os caminhos no ts pra js
import { stdin as input, stdout as output } from "process";
import { handleListAccounts } from "./AccountsRouter";
import { handleNewAccount } from "./clientRoute";

export const menuInterface = readline.createInterface({ input, output });

async function handleMenu(): Promise<void> {
  let menuIsRunning = true;
  while (menuIsRunning) {
    console.log("\n--- Gerenciador de Contas da TITAN  v.Mero Trainee ---");
    console.log("1. Criar Conta");
    console.log("2. Consultar Conta");
    console.log("S. Sair do programa");

    const maninMenuAnswer = await menuInterface.question('Digite o número ou "S" para sair: ');
    try {
      switch (maninMenuAnswer.toUpperCase()) {
        case "1":
          await handleNewAccount();
          break;
        case "2":
          await handleListAccounts();
          break;
        case "S":
          console.log("\n Saindo do programa.");
          menuIsRunning = false;
          break;
        default:
          console.log("\n Opção inválida. Tente novamente.\n");
      }
    } catch (error) {
      console.error("\n Ocorreu um erro durante a execução da opção:");
      if (error instanceof Error) {
        console.error(`Mensagem de Erro: ${error.message}`);
      } else {
        console.error("Mensagem: Erro desconhecido.");
      }
    }
  }

  menuInterface.close();
}

handleMenu();

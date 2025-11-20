import { Entity } from "../../shared/entity";
import { Client } from "./Client";
export type AccountConstructorProps = {
  client: Client;
  accountNumber: number;

  balance: number;
};
export class Account extends Entity {
  client: Client;
  accountNumber: number;

  balance: number;
  constructor(props: AccountConstructorProps) {
    super(props.accountNumber);
    this.balance = props.balance;
    this.accountNumber = props.accountNumber;
    this.client = props.client;
  }

  static create(props: AccountConstructorProps) {
    const account = new Account(props);

    //category.validate();

    //this.validate(category);

    return account;
  }

  public deposit(value: number) {
    if (value > 0) {
      this.balance = this.balance + value;
    }
    //****** Adicionar outras vericacoes  */2
  }

  public withdraw(value: number) {
    if (value > 0 && this.balance > value) {
      this.balance = this.balance - value;
    }
    //****** Adicionar outras vericacoes  */
  }
}

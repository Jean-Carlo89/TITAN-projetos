import { Entity } from "../../shared/entity";
import { Account } from "./Accounts";
export type ClientConstructorProps = {
  name: string;
  email?: string | null;
  id: number;
  accounts: Account[];
};
export class Client extends Entity {
  email: string;
  name: string;
  accounts: Account[];
  constructor(props: ClientConstructorProps) {
    super(props.id);
    this.email = props.email ?? "";
    this.name = props.name;
    this.accounts = props.accounts;
  }

  static create(props: ClientConstructorProps) {
    const client = new Client(props);

    //category.validate();

    //this.validate(category);

    return client;
  }
}

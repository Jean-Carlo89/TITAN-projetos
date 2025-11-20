import { Client } from "@core/domain/entities/Client";
import { IClientRepository } from "@core/shared/domain/interfaces/IClientRepository";

export class ClientService {
  private repository: IClientRepository;
  constructor(repository: IClientRepository) {
    this.repository = repository;
  }

  public async createClient(input: Client) {
    await this.repository.insert(input);
  }

  public async listClients(): Promise<Client[]> {
    return await this.repository.findAll();
  }
}

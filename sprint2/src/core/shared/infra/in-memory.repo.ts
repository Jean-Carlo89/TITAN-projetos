import path from "path";
import { Account } from "../../domain/entities/Accounts";
import { IRepository } from "../domain/interfaces/IRepository";

import { Entity } from "../entity";
import * as fs from "fs/promises";
export abstract class InMemoryRepository<E extends Entity> implements IRepository<E> {
  protected items: E[] = [];

  async update(entity: E): Promise<void> {
    const indexFound = this.items.findIndex((item) => item === entity);

    if (indexFound === -1) {
      throw new Error("Ocorreu um erro durante a atualizacao da conta");
    }

    this.items[indexFound] = entity;
  }

  async insert(entity: E): Promise<void> {
    console.log(this.items);
    await this.items.push(entity);

    console.log(this.items);
  }
  async findById(Id: number): Promise<E | null> {
    const item = this.items.find((item) => item.id === Id);

    return typeof item === "undefined" ? null : item;
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
}

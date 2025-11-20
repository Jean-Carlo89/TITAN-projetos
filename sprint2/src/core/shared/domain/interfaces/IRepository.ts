import { Entity } from "../../entity";

export interface IRepository<E extends Entity> {
  insert(entity: E): Promise<void>;
  //bulkInsert(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  //delete(entity_id: EntityId): Promise<void>;

  findById(entity_id: number): Promise<E | null>;
  findAll(): Promise<E[]>;

  //getEntity(): new (...args: any[]) => E;
}

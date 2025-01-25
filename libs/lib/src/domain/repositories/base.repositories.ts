export interface IBaseRepository<T> {
  save?(entity: Partial<T>): Promise<T>;
  find?(condition: Partial<T>): Promise<T[]>;
  findOne?(condition: Partial<T>): Promise<T>;
  update?(condition: Partial<T>, entity: Partial<T>): Promise<T>;
  delete?(condition: Partial<T>): Promise<boolean>;
}

import { IFindOneOptions, IFindOptions } from '../adapters/query.interface';

export interface IBaseRepository<T> {
  save?(entity: Partial<T>): Promise<T>;
  find?(condition: IFindOptions<T>): Promise<T[]>;
  findOne?(condition: IFindOneOptions<T>): Promise<T>;
  update?(condition: Partial<T>, entity: Partial<T>): Promise<T>;
  delete?(condition: Partial<T>): Promise<boolean>;
}

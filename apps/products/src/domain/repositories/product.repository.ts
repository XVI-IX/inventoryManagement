import { IBaseRepository } from '@app/lib/domain/repositories';
import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';

export interface IProductsRepository extends IBaseRepository<Products> {
  findByIds?(condition: { id: string[] }): Promise<Products[]>;
}

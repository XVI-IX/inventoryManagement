import { IBaseRepository } from '@app/lib/domain/repositories';
import { Category } from '@app/lib/infrastructure/services/database/entities/category.entity';

export interface ICategoryRepository extends IBaseRepository<Category> {}

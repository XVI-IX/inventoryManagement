import { IBaseRepository } from '@app/lib/domain/repositories';
import { Suppliers } from '@app/lib/infrastructure/services/database/entities/suppliers.entity';

export interface ISuppliersRepository extends IBaseRepository<Suppliers> {}

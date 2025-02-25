import { Logger } from '@nestjs/common';
import { ISuppliersRepository } from '../domain/repositories/suppliers.repository';
import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';

export class GetSupplierProductsUseCase {
  private readonly logger: Logger;
  constructor(private readonly suppliersRepository: ISuppliersRepository) {
    this.logger = new Logger(GetSupplierProductsUseCase.name);
  }

  async execute(supplierId: string): Promise<Products[]> {
    try {
      const supplier = await this.suppliersRepository.findOne({
        where: {
          id: supplierId,
        },
      });

      if (!supplier) {
        throw new Error('Products could not be retrieved');
      }

      return supplier.products;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

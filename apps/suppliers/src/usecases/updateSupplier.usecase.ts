import { BadRequestException, Logger } from '@nestjs/common';
import { ISuppliersRepository } from '../domain/repositories/suppliers.repository';
import { Suppliers } from '@app/lib/infrastructure/services/database/entities/suppliers.entity';

export class UpdateSupplierUseCase {
  private readonly logger: Logger;
  constructor(private readonly supplierRepository: ISuppliersRepository) {
    this.logger = new Logger(UpdateSupplierUseCase.name);
  }

  async execute(
    supplierId: string,
    entity: Partial<Suppliers>,
  ): Promise<Suppliers> {
    try {
      const supplier = await this.supplierRepository.find({
        where: {
          id: supplierId,
        },
      });

      if (!supplier) {
        throw new BadRequestException('Supplier could not be updated');
      }

      return await this.supplierRepository.save({
        ...supplier,
        ...entity,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

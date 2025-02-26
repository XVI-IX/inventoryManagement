import { BadRequestException, Logger } from '@nestjs/common';
import { ISuppliersRepository } from '../domain/repositories/suppliers.repository';

export class DeleteSupplierUseCase {
  private readonly logger: Logger;
  constructor(private readonly supplierRepository: ISuppliersRepository) {
    this.logger = new Logger(DeleteSupplierUseCase.name);
  }

  async execute(supplierId: string): Promise<void> {
    try {
      const supplier = await this.supplierRepository.findOne({
        where: {
          id: supplierId,
        },
      });

      if (!supplier) {
        throw new BadRequestException('Supplier could not be retrieved');
      }

      await this.supplierRepository.delete({
        id: supplierId,
      });

      return;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

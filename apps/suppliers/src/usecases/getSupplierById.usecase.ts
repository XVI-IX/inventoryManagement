import { BadRequestException, Logger } from '@nestjs/common';
import { ISuppliersRepository } from '../domain/repositories/suppliers.repository';
import { Suppliers } from '@app/lib/infrastructure/services/database/entities/suppliers.entity';
import { IFindOneOptions } from '@app/lib/domain/adapters/query.interface';

/**
 * @name GetSupplierByIdUseCase
 * @description Get supplier by id use case
 * @param {ISuppliersRepository} suppliersRepository
 */
export class GetSupplierByIdUseCase {
  private readonly logger: Logger;
  constructor(private readonly suppliersRepository: ISuppliersRepository) {
    this.logger = new Logger(GetSupplierByIdUseCase.name);
  }

  async execute(
    supplierId: string,
    options: IFindOneOptions<Suppliers>,
  ): Promise<Suppliers> {
    try {
      const supplier = await this.suppliersRepository.findOne({
        where: {
          id: supplierId,
        },
        ...options,
      });

      if (!supplier) {
        throw new BadRequestException('Supplier could not be retrieved');
      }

      return supplier;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

import { Suppliers } from '@app/lib/infrastructure/services/database/entities/suppliers.entity';
import { BadRequestException, Logger } from '@nestjs/common';
import { ISuppliersRepository } from '../domain/repositories/suppliers.repository';

export class GetSupplierByField {
  private readonly logger: Logger;
  constructor(private readonly suppliersRepository: ISuppliersRepository) {
    this.logger = new Logger(GetSupplierByField.name);
  }

  async execute(fieldObj: Partial<Suppliers[]>): Promise<Suppliers> {
    try {
      const suppliers = await this.suppliersRepository.find({
        where: fieldObj,
      });

      if (!suppliers) {
        throw new BadRequestException('Suppliers could not be retrieved');
      }

      return suppliers;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
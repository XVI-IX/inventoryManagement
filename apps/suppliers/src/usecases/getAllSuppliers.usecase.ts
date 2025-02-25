import { BadRequestException, Logger } from '@nestjs/common';
import { ISuppliersRepository } from '../domain/repositories/suppliers.repository';
import { Suppliers } from '@app/lib/infrastructure/services/database/entities/suppliers.entity';

export class GetAllSuppliersUseCase {
  private readonly logger: Logger;
  constructor(private readonly suppliersRepository: ISuppliersRepository) {
    this.logger = new Logger(GetAllSuppliersUseCase.name);
  }

  async execute(): Promise<Suppliers[]> {
    try {
      const suppliers = await this.suppliersRepository.find({});

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

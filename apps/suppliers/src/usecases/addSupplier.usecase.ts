import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { SupplierInput } from '../infrastructure/common/schema/supplier.schema';
import { Suppliers } from '@app/lib/infrastructure/services/database/entities/suppliers.entity';
import { ISuppliersRepository } from '../domain/repositories/suppliers.repository';
import { IProductsRepository } from 'apps/products/src/domain/repositories/product.repository';
import { In } from 'typeorm';

export class AddSupplierUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly supplierRepository: ISuppliersRepository,
    private readonly productRepository: IProductsRepository,
  ) {
    this.logger = new Logger(AddSupplierUseCase.name);
  }

  async execute(entity: SupplierInput): Promise<Suppliers> {
    try {
      const supplierExists = await this.supplierRepository.findOne({
        where: {
          email: entity.email,
          phoneNumber: entity.phoneNumber,
        },
      });

      if (supplierExists) {
        throw new ConflictException('Supplier already exists');
      }

      const products = await this.productRepository.find({
        where: {
          id: In(entity.products) as unknown as keyof Suppliers,
        },
      });

      if (!products) {
        throw new BadRequestException('Products could not be retrieved');
      }

      const supplier = await this.supplierRepository.save({
        ...entity,
        products,
      });

      if (!supplier) {
        throw new BadRequestException('Supplier could not be added');
      }

      return supplier;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

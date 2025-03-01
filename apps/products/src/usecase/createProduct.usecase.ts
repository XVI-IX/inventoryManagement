import { ConflictException, Logger } from '@nestjs/common';
import { CreateProductInput } from '../infrastructure/common/schema/products.schema';
import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';
import { IProductsRepository } from '../domain/repositories/product.repository';

export class CreateProductUseCase {
  private readonly logger: Logger;
  constructor(private readonly productRepository: IProductsRepository) {
    this.logger = new Logger(CreateProductUseCase.name);
  }

  async execute(entity: CreateProductInput): Promise<Products> {
    try {
      const product = await this.productRepository.find({
        where: {
          name: entity.name,
          brand: entity.brand,
          uom: entity.uom,
        },
      });

      if (product.length > 0) {
        throw new ConflictException('Product has been added.');
      }

      const newProduct = await this.productRepository.save(entity);

      return newProduct;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

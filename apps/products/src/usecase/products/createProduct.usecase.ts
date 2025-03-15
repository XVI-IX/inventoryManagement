import { ConflictException, Logger } from '@nestjs/common';
import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';
import { IProductsRepository } from '../../domain/repositories/product.repository';
import { ICategoryRepository } from '../../domain/repositories/category.repository';

export class CreateProductUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly productRepository: IProductsRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {
    this.logger = new Logger(CreateProductUseCase.name);
  }

  async execute(entity: Partial<Products>): Promise<Products> {
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

      if (entity.category) {
        const category = await this.categoryRepository.findOne({
          where: {
            id: entity.category.id,
          },
        });

        if (!category) {
          throw new ConflictException('Category does not exist.');
        }

        entity.category = category;
      }

      const newProduct = await this.productRepository.save(entity);

      return newProduct;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

import { Logger, NotFoundException } from '@nestjs/common';
import { IProductsRepository } from '../../domain/repositories/product.repository';
import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';

export class UpdateProductUseCase {
  private readonly logger: Logger;
  constructor(private readonly productRepository: IProductsRepository) {
    this.logger = new Logger(UpdateProductUseCase.name);
  }

  async execute(
    productId: string,
    entity: Partial<Products>,
  ): Promise<Products> {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      await this.productRepository.update(
        {
          id: productId,
        },
        entity,
      );

      return await this.productRepository.findOne({
        where: {
          id: productId,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

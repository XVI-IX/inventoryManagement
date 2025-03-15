import { Logger, NotFoundException } from '@nestjs/common';
import { IProductsRepository } from '../../domain/repositories/product.repository';

export class GetProductByIdUseCase {
  private readonly logger: Logger;
  constructor(private readonly productRepository: IProductsRepository) {
    this.logger = new Logger(GetProductByIdUseCase.name);
  }

  async execute(productId: string) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

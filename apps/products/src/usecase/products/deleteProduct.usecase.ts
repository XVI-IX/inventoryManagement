import { Logger, NotFoundException } from '@nestjs/common';
import { IProductsRepository } from '../../domain/repositories/product.repository';

export class DeleteProductUseCase {
  private readonly logger: Logger;
  constructor(private readonly productRepository: IProductsRepository) {
    this.logger = new Logger(DeleteProductUseCase.name);
  }

  async execute(productId: string): Promise<void> {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      await this.productRepository.delete({
        id: productId,
      });

      return;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

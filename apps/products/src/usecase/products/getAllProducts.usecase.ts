import { BadRequestException, Logger } from '@nestjs/common';
import { IProductsRepository } from '../../domain/repositories/product.repository';
import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';

export class GetAllProductsUseCase {
  private readonly logger: Logger;
  constructor(private readonly productRepository: IProductsRepository) {
    this.logger = new Logger(GetAllProductsUseCase.name);
  }

  async execute(): Promise<Products[]> {
    try {
      const products = await this.productRepository.find({});

      if (!products) {
        throw new BadRequestException('Products could not be retrieved');
      }

      return products;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

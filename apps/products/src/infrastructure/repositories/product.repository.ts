import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { IProductsRepository } from '../../domain/repositories/product.repository';
import { Repository } from 'typeorm';
import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';
import { IFindOptions } from '@app/lib/domain/adapters/query.interface';

@Injectable()
export class ProductRepository implements IProductsRepository {
  private readonly logger: Logger;
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productsRepository: Repository<Products>,
  ) {
    this.logger = new Logger(ProductRepository.name);
  }

  async find(condition: IFindOptions<Products>): Promise<Products[]> {
    try {
      const products = await this.productsRepository.find({
        where: condition.where,
        order: condition.order,
        skip: condition.skip,
        take: condition.take,
        relations: {
          supplier: true,
        },
      });

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

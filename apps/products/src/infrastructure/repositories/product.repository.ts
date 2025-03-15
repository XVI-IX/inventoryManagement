import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IProductsRepository } from '../../domain/repositories/product.repository';
import { In, Repository } from 'typeorm';
import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';
import {
  IFindOneOptions,
  IFindOptions,
} from '@app/lib/domain/adapters/query.interface';

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

  async findOne(condition: IFindOneOptions<Products>): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne({
        ...condition,
        relations: {
          supplier: true,
        },
      });

      return product;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async save(entity: Partial<Products>): Promise<Products> {
    try {
      const product = await this.productsRepository.save(entity);

      return product;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(
    condition: { id: string },
    entity: Partial<Products>,
  ): Promise<any> {
    try {
      const product = await this.productsRepository.findOne({
        where: {
          id: condition.id,
        },
      });

      if (product) {
        throw new NotFoundException('Product not found');
      }

      const updatedProduct = await this.productsRepository.update(
        {
          id: condition.id,
        },
        entity,
      );

      return updatedProduct;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async delete(condition: Partial<Products>): Promise<boolean> {
    try {
      const product = await this.productsRepository.findOne({
        where: condition,
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      await this.productsRepository.delete(product);

      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findByIds(condition: { id: string[] }): Promise<Products[]> {
    try {
      const products = await this.productsRepository.find({
        where: {
          id: In(condition.id),
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

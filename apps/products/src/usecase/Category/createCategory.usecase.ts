import { ConflictException, Logger } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository';
import { CreateCategoryInput } from '../../infrastructure/common/schema/category.schema';
import { Category } from '@app/lib/infrastructure/services/database/entities/category.entity';
import { IProductsRepository } from '../../domain/repositories/product.repository';
import { In } from 'typeorm';

export class CreateCategoryUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly productRepository: IProductsRepository,
  ) {
    this.logger = new Logger(CreateCategoryUseCase.name);
  }

  async execute(entity: CreateCategoryInput): Promise<Category> {
    try {
      const categoryExists = await this.categoryRepository.find({
        where: {
          name: entity.name,
        },
      });

      if (categoryExists.length > 0) {
        throw new ConflictException('Category already exists');
      }

      const idMap = entity.products.map((ids) => String(ids));

      if (entity.products.length > 0) {
        const products = await this.productRepository.find({
          where: {
            id: In(idMap),
          },
        });
      }

      delete entity.products;

      const category = await this.categoryRepository.save(entity);

      if (!category) {
        throw new ConflictException('Category could not be created');
      }

      return category;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

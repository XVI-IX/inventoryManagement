import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository';
import { Repository } from 'typeorm';
import { Category } from '@app/lib/infrastructure/services/database/entities/category.entity';
import { IFindOptions } from '@app/lib/domain/adapters/query.interface';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  private readonly logger: Logger;
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>,
  ) {
    this.logger = new Logger(CategoryRepository.name);
  }

  async save(entity: Partial<Category>): Promise<Category> {
    try {
      const category = await this.categoryRepository.save(entity);

      return category;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async find(condition: IFindOptions<Category>): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.find({
        where: condition.where,
        order: condition.order,
        skip: condition.skip,
        take: condition.take,
        relations: {
          products: true,
        },
      });

      return categories;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne(condition: IFindOptions<Category>): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: condition.where,
        relations: {
          products: true,
        },
      });

      return category;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(categoryId: string, entity: Partial<Category>): Promise<any> {
    try {
      const category = await this.categoryRepository.update(
        { id: categoryId },
        entity,
      );

      return category;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async delete(categoryId: string): Promise<any> {
    try {
      const category = await this.categoryRepository.delete({ id: categoryId });

      return category;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

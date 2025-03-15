import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository';
import { Repository } from 'typeorm';
import { Category } from '@app/lib/infrastructure/services/database/entities/category.entity';
import {
  IFindOneOptions,
  IFindOptions,
} from '@app/lib/domain/adapters/query.interface';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  private readonly logger: Logger;
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>,
  ) {
    this.logger = new Logger(CategoryRepository.name);
  }

  async save?(entity: Partial<Category>): Promise<Category> {
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

  async findOne(condition: IFindOneOptions<Category>): Promise<Category> {
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

  async update(
    condition: {
      id: string;
    },
    entity: Partial<Category>,
  ): Promise<Category> {
    try {
      const category = await this.categoryRepository.update(
        { id: condition.id },
        entity,
      );

      if (!category) {
        throw new BadRequestException('Category could not be updated');
      }

      return await this.categoryRepository.findOne({
        where: {
          id: condition.id,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async delete(condition: { id: string }): Promise<any> {
    try {
      const category = await this.categoryRepository.delete({
        id: condition.id,
      });

      return category;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

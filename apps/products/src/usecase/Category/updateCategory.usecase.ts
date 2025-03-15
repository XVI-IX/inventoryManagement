import { Logger, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '@app/lib/infrastructure/services/database/entities/category.entity';

export class UpdateCategoryUseCase {
  private readonly logger: Logger;

  constructor(private readonly categoryRepository: ICategoryRepository) {
    this.logger = new Logger(UpdateCategoryUseCase.name);
  }

  async execute(
    categoryId: string,
    entity: Partial<Category>,
  ): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      await this.categoryRepository.update(
        {
          id: categoryId,
        },
        entity,
      );

      return await this.categoryRepository.findOne({
        where: {
          id: categoryId,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

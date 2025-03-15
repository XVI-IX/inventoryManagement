import { Category } from '@app/lib/infrastructure/services/database/entities/category.entity';
import { Logger } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository';
import { NotFoundError } from 'rxjs';

export class GetCategoryByIdUseCase {
  private readonly logger: Logger;

  constructor(private readonly categoryRepository: ICategoryRepository) {
    this.logger = new Logger(GetCategoryByIdUseCase.name);
  }

  async execute(categoryId: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new NotFoundError('Category not found');
      }

      return category;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

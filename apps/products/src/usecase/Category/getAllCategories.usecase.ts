import { BadRequestException, Logger } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '@app/lib/infrastructure/services/database/entities/category.entity';

export class GetAllCategoriesUseCase {
  private readonly logger: Logger;
  constructor(private readonly categoryRepository: ICategoryRepository) {
    this.logger = new Logger(GetAllCategoriesUseCase.name);
  }

  async execute(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.find({});

      if (!categories) {
        throw new BadRequestException('No categories found');
      }

      return categories;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

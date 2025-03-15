import { Logger, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository';

export class DeleteCategoryUseCase {
  private readonly logger: Logger;

  constructor(private readonly categoryRepository: ICategoryRepository) {
    this.logger = new Logger(DeleteCategoryUseCase.name);
  }

  async execute(categoryId: string): Promise<void> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      await this.categoryRepository.delete({
        id: categoryId,
      });

      return;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { ProductRepositoryModule } from '../repositories/products-repository.module';
import { CategoryRepository } from '../repositories/category.repository';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { CreateCategoryUseCase } from '../../usecase/Category/createCategory.usecase';
import { ProductRepository } from '../repositories/product.repository';

@Module({
  imports: [DatabaseModule, ProductRepositoryModule],
})
export class ProductGeneralUseCaseModule {
  static CREATE_CATEGORY_USE_CASE_PROXY = 'CREATE_CATEGORY_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: ProductGeneralUseCaseModule,
      providers: [
        {
          inject: [CategoryRepository, ProductRepository],
          provide: ProductGeneralUseCaseModule.CREATE_CATEGORY_USE_CASE_PROXY,
          useFactory: (
            categoryRepository: CategoryRepository,
            productRepository: ProductRepository,
          ) =>
            new UseCaseProxy(
              new CreateCategoryUseCase(categoryRepository, productRepository),
            ),
        },
      ],
      exports: [ProductGeneralUseCaseModule.CREATE_CATEGORY_USE_CASE_PROXY],
    };
  }
}

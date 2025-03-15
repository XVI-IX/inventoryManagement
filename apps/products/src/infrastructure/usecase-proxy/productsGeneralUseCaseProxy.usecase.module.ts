import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { ProductRepositoryModule } from '../repositories/products-repository.module';
import { CategoryRepository } from '../repositories/category.repository';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { CreateCategoryUseCase } from '../../usecase/Category/createCategory.usecase';
import { ProductRepository } from '../repositories/product.repository';
import { GetAllProductsUseCase } from '../../usecase/products/getAllProducts.usecase';
import { UpdateProductUseCase } from '../../usecase/products/updateProduct.usecase';
import { CreateProductUseCase } from '../../usecase/products/createProduct.usecase';
import { DeleteProductUseCase } from '../../usecase/products/deleteProduct.usecase';

@Module({
  imports: [DatabaseModule, ProductRepositoryModule],
})
export class ProductGeneralUseCaseModule {
  // Products usecases
  static CREATE_PRODUCT_USE_CASE_PROXY = 'CREATE_PRODUCT_USE_CASE_PROXY';
  static GET_ALL_PRODUCTS_USE_CASE_PROXY = 'GET_ALL_PRODUCTS_USE_CASE_PROXY';
  static GET_PRODUCT_BY_ID_USE_CASE_PROXY = 'GET_PRODUCT_BY_ID_USE_CASE_PROXY';
  static UPDATE_PRODUCT_USE_CASE_PROXY = 'UPDATE_PRODUCT_USE_CASE_PROXY';
  static DELETE_PRODUCT_USE_CASE_PROXY = 'DELETE_PRODUCT_USE_CASE_PROXY';

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
        {
          inject: [ProductRepository],
          provide: ProductGeneralUseCaseModule.GET_ALL_PRODUCTS_USE_CASE_PROXY,
          useFactory: (productRepository: ProductRepository) =>
            new UseCaseProxy(new GetAllProductsUseCase(productRepository)),
        },
        {
          inject: [ProductRepository],
          provide: ProductGeneralUseCaseModule.GET_PRODUCT_BY_ID_USE_CASE_PROXY,
          useFactory: (productRepository: ProductRepository) =>
            new UseCaseProxy(new GetAllProductsUseCase(productRepository)),
        },
        {
          inject: [ProductRepository],
          provide: ProductGeneralUseCaseModule.UPDATE_PRODUCT_USE_CASE_PROXY,
          useFactory: (productRepository: ProductRepository) =>
            new UseCaseProxy(new UpdateProductUseCase(productRepository)),
        },
        {
          inject: [ProductRepository],
          provide: ProductGeneralUseCaseModule.CREATE_CATEGORY_USE_CASE_PROXY,
          useFactory: (
            productRepository: ProductRepository,
            categoryRepository: CategoryRepository,
          ) =>
            new UseCaseProxy(
              new CreateProductUseCase(productRepository, categoryRepository),
            ),
        },
        {
          inject: [ProductRepository],
          provide: ProductGeneralUseCaseModule.DELETE_PRODUCT_USE_CASE_PROXY,
          useFactory: (productRepository: ProductRepository) =>
            new UseCaseProxy(new DeleteProductUseCase(productRepository)),
        },
      ],
      exports: [
        ProductGeneralUseCaseModule.CREATE_CATEGORY_USE_CASE_PROXY,

        ProductGeneralUseCaseModule.GET_ALL_PRODUCTS_USE_CASE_PROXY,
        ProductGeneralUseCaseModule.GET_PRODUCT_BY_ID_USE_CASE_PROXY,
        ProductGeneralUseCaseModule.UPDATE_PRODUCT_USE_CASE_PROXY,
        ProductGeneralUseCaseModule.DELETE_PRODUCT_USE_CASE_PROXY,
        ProductGeneralUseCaseModule.CREATE_CATEGORY_USE_CASE_PROXY,
      ],
    };
  }
}

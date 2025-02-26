import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { SuppliersRepositoryModule } from '../repository/suppliersRepository.module';
import { SupplierRepository } from '../repository/suppliers.repository';
import { ProductRepository } from 'apps/products/src/infrastructure/repositories/product.repository';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { AddSupplierUseCase } from '../../usecases/addSupplier.usecase';
import { GetSupplierByIdUseCase } from '../../usecases/getSupplierById.usecase';
import { UpdateSupplierUseCase } from '../../usecases/updateSupplier.usecase';
import { DeleteSupplierUseCase } from '../../usecases/deleteSupplier.usecase';
import { GetAllSuppliersUseCase } from '../../usecases/getAllSuppliers.usecase';
import { GetSupplierProductsUseCase } from '../../usecases/getSupplierProducts.usecase';

@Module({
  imports: [DatabaseModule, SuppliersRepositoryModule],
})
export class SuppliersGeneralUseCaseProxyModule {
  static ADD_SUPPLIER_USE_CASE_PROXY = 'ADD_SUPPLIER_USE_CASE_PROXY';
  static GET_SUPPLIER_BY_ID_USE_CASE_PROXY =
    'GET_SUPPLIER_BY_ID_USE_CASE_PROXY';
  static UPDATE_SUPPLIER_USE_CASE_PROXY = 'UPDATE_SUPPLIER_USE_CASE_PROXY';
  static DELETE_SUPPLIER_USE_CASE_PROXY = 'DELETE_SUPPLIER_USE_CASE_PROXY';
  static GET_ALL_SUPPLIERS_USE_CASE_PROXY = 'GET_ALL_SUPPLIERS_USE_CASE_PROXY';
  static GET_ALL_SUPPLIERS_PRODUCTS_USE_CASE_PROXY =
    'GET_ALL_SUPPLIERS_PRODUCTS_USE_CASE_PROXY';
  static GET_SUPPLIER_BY_FIELD_USE_CASE_PROXY =
    'GET_SUPPLIER_BY_FIELD_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: SuppliersGeneralUseCaseProxyModule,
      providers: [
        {
          inject: [SupplierRepository, ProductRepository],
          provide:
            SuppliersGeneralUseCaseProxyModule.ADD_SUPPLIER_USE_CASE_PROXY,
          useFactory: (
            supplierRepository: SupplierRepository,
            productRepository: ProductRepository,
          ) =>
            new UseCaseProxy(
              new AddSupplierUseCase(supplierRepository, productRepository),
            ),
        },
        {
          inject: [SupplierRepository],
          provide:
            SuppliersGeneralUseCaseProxyModule.GET_SUPPLIER_BY_ID_USE_CASE_PROXY,
          useFactory: (supplierRepository: SupplierRepository) =>
            new UseCaseProxy(new GetSupplierByIdUseCase(supplierRepository)),
        },
        {
          inject: [SupplierRepository],
          provide:
            SuppliersGeneralUseCaseProxyModule.UPDATE_SUPPLIER_USE_CASE_PROXY,
          useFactory: (supplierRepository: SupplierRepository) =>
            new UseCaseProxy(new UpdateSupplierUseCase(supplierRepository)),
        },
        {
          inject: [SupplierRepository],
          provide:
            SuppliersGeneralUseCaseProxyModule.DELETE_SUPPLIER_USE_CASE_PROXY,
          useFactory: (supplierRepository: SupplierRepository) =>
            new UseCaseProxy(new DeleteSupplierUseCase(supplierRepository)),
        },
        {
          inject: [SupplierRepository],
          provide:
            SuppliersGeneralUseCaseProxyModule.GET_ALL_SUPPLIERS_PRODUCTS_USE_CASE_PROXY,
          useFactory: (supplierRepository: SupplierRepository) =>
            new UseCaseProxy(new GetAllSuppliersUseCase(supplierRepository)),
        },
        {
          inject: [SupplierRepository],
          provide:
            SuppliersGeneralUseCaseProxyModule.GET_ALL_SUPPLIERS_PRODUCTS_USE_CASE_PROXY,
          useFactory: (supplierRepository: SupplierRepository) =>
            new UseCaseProxy(
              new GetSupplierProductsUseCase(supplierRepository),
            ),
        },
        {
          inject: [SupplierRepository],
          provide:
            SuppliersGeneralUseCaseProxyModule.GET_SUPPLIER_BY_FIELD_USE_CASE_PROXY,
          useFactory: (supplierRepository: SupplierRepository) =>
            new UseCaseProxy(new GetSupplierByIdUseCase(supplierRepository)),
        },
      ],
      exports: [
        SuppliersGeneralUseCaseProxyModule.ADD_SUPPLIER_USE_CASE_PROXY,
        SuppliersGeneralUseCaseProxyModule.GET_SUPPLIER_BY_ID_USE_CASE_PROXY,
        SuppliersGeneralUseCaseProxyModule.UPDATE_SUPPLIER_USE_CASE_PROXY,
        SuppliersGeneralUseCaseProxyModule.DELETE_SUPPLIER_USE_CASE_PROXY,
        SuppliersGeneralUseCaseProxyModule.GET_ALL_SUPPLIERS_PRODUCTS_USE_CASE_PROXY,
        SuppliersGeneralUseCaseProxyModule.GET_SUPPLIER_BY_FIELD_USE_CASE_PROXY,
      ],
    };
  }
}

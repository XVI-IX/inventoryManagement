import { Controller, Inject, Logger } from '@nestjs/common';
import { SuppliersGeneralUseCaseProxyModule } from '../usecase-proxy/suppliersGeneralUseCaseProxy.module';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { AddSupplierUseCase } from '../../usecases/addSupplier.usecase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SupplierInput } from '../common/schema/supplier.schema';
import { ServiceInterface } from '@app/lib/domain/adapters';
import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';
import { HttpResponse } from '@app/lib/infrastructure/helpers/response.helper';
import { Suppliers } from '@app/lib/infrastructure/services/database/entities/suppliers.entity';
import { GetAllSuppliersUseCase } from '../../usecases/getAllSuppliers.usecase';
import { GetSupplierByIdUseCase } from '../../usecases/getSupplierById.usecase';

@Controller()
export class SupplierController {
  private readonly logger: Logger;
  constructor(
    @Inject(SuppliersGeneralUseCaseProxyModule.ADD_SUPPLIER_USE_CASE_PROXY)
    private readonly addSupplierUseCase: UseCaseProxy<AddSupplierUseCase>,
    @Inject(
      SuppliersGeneralUseCaseProxyModule.GET_ALL_SUPPLIERS_PRODUCTS_USE_CASE_PROXY,
    )
    private readonly getAllSuppliersUseCase: UseCaseProxy<GetAllSuppliersUseCase>,
    @Inject(
      SuppliersGeneralUseCaseProxyModule.GET_SUPPLIER_BY_ID_USE_CASE_PROXY,
    )
    private readonly getSupplierByIdUseCase: UseCaseProxy<GetSupplierByIdUseCase>,
  ) {
    this.logger = new Logger(SupplierController.name);
  }

  @MessagePattern('addSupplier')
  async addSupplier(
    @Payload() entity: SupplierInput,
  ): Promise<ServiceInterface<Products>> {
    try {
      const supplier = await this.addSupplierUseCase
        .getInstance()
        .execute(entity);

      return HttpResponse.send('Supplier added successfully', supplier);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @MessagePattern('getAllSuppliers')
  async getAllSuppliers(): Promise<ServiceInterface<Suppliers[]>> {
    try {
      const suppliers = await this.getAllSuppliersUseCase
        .getInstance()
        .execute();

      return HttpResponse.send('Suppliers retrieved', suppliers);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @MessagePattern('getSupplierById')
  async getSupplierById(
    @Payload() data: { supplierId: string },
  ): Promise<ServiceInterface<Suppliers>> {
    try {
      const supplier = await this.getSupplierByIdUseCase
        .getInstance()
        .execute(data.supplierId);

      return HttpResponse.send('Supplier retrieved', supplier);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

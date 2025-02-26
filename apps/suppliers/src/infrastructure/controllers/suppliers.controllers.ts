import { Controller, Inject, Logger } from '@nestjs/common';
import { SuppliersGeneralUseCaseProxyModule } from '../usecase-proxy/suppliersGeneralUseCaseProxy.module';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { AddSupplierUseCase } from '../../usecases/addSupplier.usecase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SupplierInput } from '../common/schema/supplier.schema';
import { ServiceInterface } from '@app/lib/domain/adapters';
import { Products } from '@app/lib/infrastructure/services/database/entities/products.entity';
import { HttpResponse } from '@app/lib/infrastructure/helpers/response.helper';

@Controller()
export class SupplierController {
  private readonly logger: Logger;
  constructor(
    @Inject(SuppliersGeneralUseCaseProxyModule.ADD_SUPPLIER_USE_CASE_PROXY)
    private readonly addSupplierUseCase: UseCaseProxy<AddSupplierUseCase>,
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
}

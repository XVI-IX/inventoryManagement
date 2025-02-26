import { Module } from '@nestjs/common';
import { suppliersProviders } from './suppliers.provider';
import { SupplierRepository } from './suppliers.repository';

@Module({
  imports: [],
  providers: [...suppliersProviders, SupplierRepository],
  exports: [SupplierRepository],
})
export class SuppliersRepositoryModule {}

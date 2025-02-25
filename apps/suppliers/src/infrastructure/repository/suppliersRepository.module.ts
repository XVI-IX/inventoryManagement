import { Module } from '@nestjs/common';
import { suppliersProviders } from './suppliers.provider';

@Module({
  imports: [],
  providers: [...suppliersProviders],
})
export class SuppliersRepositoryModule {}

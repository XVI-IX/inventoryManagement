import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Module({
  imports: [DatabaseModule],
  providers: [ProductRepository],
  exports: [ProductRepository],
})
export class ProductRepositoryModule {}

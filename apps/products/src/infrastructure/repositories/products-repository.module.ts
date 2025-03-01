import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { productSProvider } from './products.provider';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [DatabaseModule],
  providers: [...productSProvider, ProductRepository, CategoryRepository],
  exports: [ProductRepository, CategoryRepository],
})
export class ProductRepositoryModule {}

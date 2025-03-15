import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoryController } from './infrastructure/controllers/category.controllers';

@Module({
  imports: [],
  controllers: [ProductsController, CategoryController],
  providers: [ProductsService],
})
export class ProductsModule {}

import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

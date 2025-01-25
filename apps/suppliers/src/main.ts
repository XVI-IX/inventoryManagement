import { NestFactory } from '@nestjs/core';
import { SuppliersModule } from './suppliers.module';

async function bootstrap() {
  const app = await NestFactory.create(SuppliersModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envConfig } from '@app/lib/infrastructure/config/environment.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        port: envConfig.getUserServicePort(),
      },
    },
  );

  await app.listen();
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { INestApplication } from '@nestjs/common';
import { envConfig } from '@app/lib/infrastructure/config/environment.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const httpGateway = await NestFactory.create<INestApplication>(GatewayModule);
  await httpGateway.listen(envConfig.getPort());

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GatewayModule,
    {
      transport: Transport.TCP,
      options: {
        host: envConfig.getMicroServiceHost(),
        port: envConfig.getMicroservicePort(),
      },
    },
  );

  await app.listen();
}
bootstrap();

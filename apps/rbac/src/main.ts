import { NestFactory } from '@nestjs/core';
import { RbacModule } from './rbac.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envConfig } from '@app/lib/infrastructure/config/environment.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RbacModule,
    {
      transport: Transport.TCP,
      options: {
        port: envConfig.getRbacServicePort(),
      },
    },
  );

  console.log(
    `RBAC service is running on port ${envConfig.getRbacServicePort()}`,
  );

  await app.listen();
}
bootstrap();

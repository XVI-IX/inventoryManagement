import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envConfig } from '@app/lib/infrastructure/config/environment.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/lib/infrastructure/guards/auth.guard';
import { JWTModule } from '@app/lib/infrastructure/services/jwt/jwt.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: envConfig.getUserServicePort(),
          host: envConfig.getMicroServiceHost(),
        },
      },
    ]),
    JWTModule,
  ],
  controllers: [GatewayController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    GatewayService,
  ],
})
export class GatewayModule {}

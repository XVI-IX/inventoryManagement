import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envConfig } from '@app/lib/infrastructure/config/environment.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/lib/infrastructure/guards/auth.guard';
import { JWTModule } from '@app/lib/infrastructure/services/jwt/jwt.module';
import { AuthGatewayController } from './infrastructure/controllers/users/auth/auth.controller';
import { ArgonModule } from '@app/lib/infrastructure/services/argon/argon.module';
import { PassportModule } from '@app/lib/infrastructure/services/passport/passport.module';
import { PermissionsGatewayController } from './infrastructure/controllers/RBAC/Permissions/permissions.controller';
import { RoleGatewayController } from './infrastructure/controllers/RBAC/Roles/roles.controller';

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
      {
        name: 'RBAC_SERVICE',
        transport: Transport.TCP,
        options: {
          host: envConfig.getMicroServiceHost(),
          port: envConfig.getRbacServicePort(),
        },
      },
    ]),
    JWTModule,
    ArgonModule,
    PassportModule,
  ],
  controllers: [
    GatewayController,
    AuthGatewayController,
    PermissionsGatewayController,
    RoleGatewayController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    GatewayService,
  ],
})
export class GatewayModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersGeneralUseCaseProxyModule } from './infrastructure/usecase-proxy/users.generalUseCaseProxy.module';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { UsersController } from './infrastructure/controllers/users.controller';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: envConfig.getDatabaseHost(),
    //   port: envConfig.getDatabasePort(),
    //   username: envConfig.getDatabaseUser(),
    //   password: envConfig.getDatabasePassword(),
    //   database: envConfig.getDatabaseName(),
    //   entities: [
    //     __dirname +
    //       '../../../libs/lib/src/infrastructure/services/database/entities/*.entity.ts',
    //   ],
    // }),
    UsersGeneralUseCaseProxyModule.register(),
  ],
  controllers: [AuthController, UsersController],
  providers: [UsersService],
})
export class UsersModule {}

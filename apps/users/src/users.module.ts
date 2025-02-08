import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersGeneralUseCaseProxyModule } from './infrastructure/usecase-proxy/users.generalUseCaseProxy.module';
import { AuthController } from './infrastructure/controllers/auth.controller';

@Module({
  imports: [UsersGeneralUseCaseProxyModule.register()],
  controllers: [AuthController],
  providers: [UsersService],
})
export class UsersModule {}

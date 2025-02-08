import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersGeneralUseCaseProxyModule } from './infrastructure/usecase-proxy/users.generalUseCaseProxy.module';

@Module({
  imports: [UsersGeneralUseCaseProxyModule.register()],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

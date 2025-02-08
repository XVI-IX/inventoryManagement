import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { UsersRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersRepository],
  exports: [UsersRepository],
})
export class UserRepositoryModule {}

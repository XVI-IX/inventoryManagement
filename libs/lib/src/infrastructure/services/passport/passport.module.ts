import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'apps/users/src/infrastructure/repositories/user.repository.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [UserRepositoryModule],
  exports: [GoogleStrategy],
  providers: [GoogleStrategy],
})
export class PassportModule {}

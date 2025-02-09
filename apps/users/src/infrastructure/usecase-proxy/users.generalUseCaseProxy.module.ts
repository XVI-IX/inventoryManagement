import { DatabaseModule } from '@app/lib/infrastructure/services/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositoryModule } from '../repositories/user.repository.module';
import { ArgonModule } from '@app/lib/infrastructure/services/argon/argon.module';
import { JWTModule } from '@app/lib/infrastructure/services/jwt/jwt.module';
import { UsersRepository } from '../repositories/user.repository';
import { ArgonService } from '@app/lib/infrastructure/services/argon/argon.service';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { RegisterUserUseCase } from '../../usecases/auth/registerUser.usecase';
import { LoginUserPasswordUseCase } from '../../usecases/auth/loginUserPassword.usecase';
import { JWTokenService } from '@app/lib/infrastructure/services/jwt/jwt.service';

@Module({
  imports: [DatabaseModule, UserRepositoryModule, ArgonModule, JWTModule],
})
export class UsersGeneralUseCaseProxyModule {
  static REGISTER_USER_USE_CASE_PROXY = 'REGISTER_USER_USE_CASE_PROXY';
  static LOGIN_USER_PASSWORD_USE_CASE_PROXY =
    'LOGIN_USER_PASSWORD_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: UsersGeneralUseCaseProxyModule,
      providers: [
        {
          inject: [UsersRepository, ArgonService],
          provide: UsersGeneralUseCaseProxyModule.REGISTER_USER_USE_CASE_PROXY,
          useFactory: (
            usersRepository: UsersRepository,
            argonService: ArgonService,
          ) =>
            new UseCaseProxy(
              new RegisterUserUseCase(usersRepository, argonService),
            ),
        },
        {
          inject: [UsersRepository, ArgonService, JWTokenService],
          provide:
            UsersGeneralUseCaseProxyModule.LOGIN_USER_PASSWORD_USE_CASE_PROXY,
          useFactory: (
            userRepository: UsersRepository,
            argonService: ArgonService,
            jwtService: JWTokenService,
          ) =>
            new UseCaseProxy(
              new LoginUserPasswordUseCase(
                userRepository,
                argonService,
                jwtService,
              ),
            ),
        },
      ],
      exports: [
        UsersGeneralUseCaseProxyModule.REGISTER_USER_USE_CASE_PROXY,
        UsersGeneralUseCaseProxyModule.LOGIN_USER_PASSWORD_USE_CASE_PROXY,
      ],
    };
  }
}

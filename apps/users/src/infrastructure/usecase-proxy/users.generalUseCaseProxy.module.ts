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
import { ForgotPasswordUseCase } from '../../usecases/auth/forgotPassword.usecase';
import { ResetPasswordUseCase } from '../../usecases/auth/resetPassword.usecase';
import { VerifyEmailUseCase } from '../../usecases/auth/verifyEmail.usecase';
import { RolesRepository } from 'apps/rbac/src/infrastructure/repository/roles.repository';
import { RbacRepositoryModule } from 'apps/rbac/src/infrastructure/repository/rbac.repository.module';

@Module({
  imports: [
    DatabaseModule,
    UserRepositoryModule,
    ArgonModule,
    JWTModule,
    RbacRepositoryModule,
  ],
})
export class UsersGeneralUseCaseProxyModule {
  static REGISTER_USER_USE_CASE_PROXY = 'REGISTER_USER_USE_CASE_PROXY';
  static LOGIN_USER_PASSWORD_USE_CASE_PROXY =
    'LOGIN_USER_PASSWORD_USE_CASE_PROXY';
  static FORGOT_PASSWORD_USE_CASE_PROXY = 'FORGOT_PASSWORD_USE_CASE_PROXY';
  static RESET_PASSWORD_USE_CASE_PROXY = 'RESET_PASSWORD_USE_CASE_PROXY';
  static VERIFY_EMAIL_USE_CASE_PROXY = 'VERIFY_EMAIL_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: UsersGeneralUseCaseProxyModule,
      providers: [
        {
          inject: [UsersRepository, ArgonService, RolesRepository],
          provide: UsersGeneralUseCaseProxyModule.REGISTER_USER_USE_CASE_PROXY,
          useFactory: (
            usersRepository: UsersRepository,
            argonService: ArgonService,
            roleRepository: RolesRepository,
          ) =>
            new UseCaseProxy(
              new RegisterUserUseCase(
                usersRepository,
                argonService,
                roleRepository,
              ),
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
        {
          inject: [UsersRepository],
          provide:
            UsersGeneralUseCaseProxyModule.FORGOT_PASSWORD_USE_CASE_PROXY,
          useFactory: (userRepository: UsersRepository) =>
            new UseCaseProxy(new ForgotPasswordUseCase(userRepository)),
        },
        {
          inject: [UsersRepository, ArgonService],
          provide: UsersGeneralUseCaseProxyModule.RESET_PASSWORD_USE_CASE_PROXY,
          useFactory: (
            userRepository: UsersRepository,
            argonService: ArgonService,
          ) =>
            new UseCaseProxy(
              new ResetPasswordUseCase(userRepository, argonService),
            ),
        },
        {
          inject: [UsersRepository],
          provide: UsersGeneralUseCaseProxyModule.VERIFY_EMAIL_USE_CASE_PROXY,
          useFactory: (userRepository: UsersRepository) =>
            new UseCaseProxy(new VerifyEmailUseCase(userRepository)),
        },
      ],
      exports: [
        UsersGeneralUseCaseProxyModule.REGISTER_USER_USE_CASE_PROXY,
        UsersGeneralUseCaseProxyModule.LOGIN_USER_PASSWORD_USE_CASE_PROXY,
        UsersGeneralUseCaseProxyModule.FORGOT_PASSWORD_USE_CASE_PROXY,
        UsersGeneralUseCaseProxyModule.RESET_PASSWORD_USE_CASE_PROXY,
        UsersGeneralUseCaseProxyModule.VERIFY_EMAIL_USE_CASE_PROXY,
      ],
    };
  }
}

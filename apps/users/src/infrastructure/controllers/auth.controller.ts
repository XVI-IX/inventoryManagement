import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateUserInput,
  LoginUserPassword,
} from '../common/schema/users.schema';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { UsersGeneralUseCaseProxyModule } from '../usecase-proxy/users.generalUseCaseProxy.module';
import { RegisterUserUseCase } from '../../usecases/auth/registerUser.usecase';
import { HttpResponse } from '@app/lib/infrastructure/helpers/response.helper';
import { Users } from '@app/lib/infrastructure/services/database/entities/user.entity';
import { LoginUserPasswordUseCase } from '../../usecases/auth/loginUserPassword.usecase';

@Controller()
export class AuthController {
  private readonly logger: Logger;
  constructor(
    @Inject(UsersGeneralUseCaseProxyModule.REGISTER_USER_USE_CASE_PROXY)
    private readonly registerUserUseCase: UseCaseProxy<RegisterUserUseCase>,
    @Inject(UsersGeneralUseCaseProxyModule.LOGIN_USER_PASSWORD_USE_CASE_PROXY)
    private readonly loginUserPasswordUseCase: UseCaseProxy<LoginUserPasswordUseCase>,
  ) {
    this.logger = new Logger(AuthController.name);
  }

  @MessagePattern('registerUser')
  async registerUser(@Payload() data: CreateUserInput) {
    try {
      const user = await this.registerUserUseCase
        .getInstance()
        .registerUser(data);

      return HttpResponse.send<Users>('User registered successfully', user);
    } catch (error) {
      // return HttpResponse.error(error.code, error.message, error.context);
      throw error;
    }
  }

  @MessagePattern('loginUserPassword')
  async loginUserPassword(@Payload() data: LoginUserPassword) {
    try {
      const response = await this.loginUserPasswordUseCase
        .getInstance()
        .loginUserPassword(data);

      return HttpResponse.send('User logged in successfully', response);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

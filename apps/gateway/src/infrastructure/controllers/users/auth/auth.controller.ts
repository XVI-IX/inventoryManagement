import { Public } from '@app/lib/infrastructure/decorators';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserInput,
  LoginUserPassword,
} from 'apps/users/src/infrastructure/common/schema/users.schema';

@Controller('api/v1/auth')
export class AuthGatewayController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
  ) {}

  @Post()
  @Public()
  async registerUser(@Body() body: CreateUserInput) {
    try {
      return this.usersService.send('registerUser', body);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post('/login')
  @Public()
  async loginUserPassword(@Body() body: LoginUserPassword) {
    return this.usersService.send('loginUserPassword', body);
  }

  @Post('/forgot-password')
  @Public()
  async forgotPassword(@Body() body: { email: string }) {
    return this.usersService.send('forgotPassword', body);
  }

  @Post('/reset-password')
  @Public()
  async resetPassword(@Body() body: { token: string; password: string }) {
    return this.usersService.send('resetPassword', body);
  }
}

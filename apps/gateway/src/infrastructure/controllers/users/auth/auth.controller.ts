import { Public } from '@app/lib/infrastructure/decorators';
import { GoogleAuthGuard } from '@app/lib/infrastructure/guards/googleAuth.guard';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserInput,
  LoginUserPassword,
  VerifyEmailInput,
} from 'apps/users/src/infrastructure/common/schema/users.schema';

@Controller('v1/auth')
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
  async resetPassword(
    @Body() body: { password: string },
    @Query('token') token: string,
  ) {
    return this.usersService.send('resetPassword', {
      password: body.password,
      token,
    });
  }

  @Post('/verify-email')
  @Public()
  async verifyEmail(@Body() body: VerifyEmailInput) {
    return this.usersService.send('verifyEmail', body);
  }

  @Get('google/login')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return {
      message: 'Google login',
    };
  }

  @Get('google/redirect')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleRedirect() {}
}

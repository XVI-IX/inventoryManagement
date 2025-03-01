import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserInput } from 'apps/users/src/infrastructure/common/schema/users.schema';

@Controller('v1/users')
export class UsersGatewayController {
  private readonly logger: Logger;
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
  ) {
    this.logger = new Logger(UsersGatewayController.name);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.send('getAllUsers', {});
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string) {
    return this.usersService.send('getUserById', { userId });
  }

  @Put('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UpdateUserInput,
  ) {
    return this.usersService.send('updateUser', { userId, entity: body });
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.send('deleteUser', { userId });
  }
}

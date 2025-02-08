import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserInput } from '../common/schema/users.schema';

@Controller()
export class AuthController {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(AuthController.name);
  }

  @MessagePattern('registerUser')
  async registerUser(@Payload() data: CreateUserInput) {
    try {
    } catch (error) {}
  }
}

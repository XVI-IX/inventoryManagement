import { ServiceInterface } from "@app/lib/domain/adapters";
import { Users } from "@app/lib/infrastructure/services/database/entities/user.entity";
import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class UsersController {
  
  private readonly logger: Logger;
  constructor() {}

  @MessagePattern('getAllUsers')
  async getAllUsers(): Promise<ServiceInterface<Users[]>> {
    try {
      const users = await 
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
import { BadRequestException, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/users.repository';
import { cleanUserResponse } from '@app/lib/infrastructure/helpers/helpers';

export class GetAllUsersUseCase {
  private readonly logger: Logger;
  constructor(private readonly userRepository: IUserRepository) {
    this.logger = new Logger(GetAllUsersUseCase.name);
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.find({});

      if (!users) {
        throw new BadRequestException('Users could not be retrieved');
      }

      return cleanUserResponse(users);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}

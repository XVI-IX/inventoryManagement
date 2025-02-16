import { BadRequestException, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/users.repository';

export class GetUsersByRoleUseCase {
  private readonly logger: Logger;
  constructor(private readonly userRepository: IUserRepository) {}

  async getUsersByRole(role: string) {
    try {
      const users = await this.userRepository.find({
        where: {
          role: {
            name: role,
          },
        },
      });

      if (!users) {
        throw new BadRequestException('Users could not be retrieved');
      }

      return users;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}

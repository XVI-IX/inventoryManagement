import { Users } from '@app/lib/infrastructure/services/database/entities/user.entity';
import { BadRequestException, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/users.repository';

export class UpdateUserUseCase {
  private readonly logger: Logger;
  constructor(private readonly userRepository: IUserRepository) {
    this.logger = new Logger(UpdateUserUseCase.name);
  }

  async updateUser(userId: string, entity: Partial<Users>) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!existingUser) {
        throw new BadRequestException('User not found');
      }

      const updatedUser = await this.userRepository.update(
        { id: existingUser.id },
        entity,
      );

      if (!updatedUser) {
        throw new BadRequestException('User could not be updated');
      }

      return updatedUser;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}

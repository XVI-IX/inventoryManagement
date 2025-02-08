import { BadRequestException, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/users.repository';

export class DeleteUserUseCase {
  private readonly logger: Logger;

  constructor(private readonly userRepository: IUserRepository) {}

  async deleteUser(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const deletedUser = await this.userRepository.delete({
        id: userId,
      });

      if (!deletedUser) {
        throw new BadRequestException('User could not be deleted');
      }

      return deletedUser;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}

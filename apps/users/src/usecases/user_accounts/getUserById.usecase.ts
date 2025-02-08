import { BadRequestException, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/users.repository';

export class GetUserByIdUseCase {
  private readonly logger: Logger;

  constructor(private readonly userRepository: IUserRepository) {
    this.logger = new Logger(GetUserByIdUseCase.name);
  }

  async getUserById(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new BadRequestException('User with id could not be retrieved');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

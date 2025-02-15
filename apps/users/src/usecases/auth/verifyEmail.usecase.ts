import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/users.repository';

export class VerifyEmailUseCase {
  private readonly logger: Logger;
  constructor(private readonly userRepository: IUserRepository) {
    this.logger = new Logger(VerifyEmailUseCase.name);
  }

  async verifyEmail(email: string, token: string) {
    try {
      const userExists = await this.userRepository.find({
        where: {
          email,
          isEmailVerified: false,
        },
      });

      if (!userExists) {
        throw new NotFoundException('Invalid email');
      }

      if (userExists[0].isEmailVerified) {
        throw new BadRequestException('Email is already verified');
      }

      if (userExists[0].verificationToken !== token) {
        throw new BadRequestException('Invalid verification token');
      }

      const verifyUser = await this.userRepository.update(
        {
          id: userExists[0].id,
        },
        {
          verificationToken: null,
          isEmailVerified: true,
        },
      );

      if (!verifyUser) {
        throw new BadRequestException('Email verification failed');
      }

      return verifyUser;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}

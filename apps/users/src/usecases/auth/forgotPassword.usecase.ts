import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/users.repository';
import { generateResetToken } from '@app/lib/infrastructure/helpers/helpers';

export class ForgotPasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async forgotPassword(email: string) {
    try {
      const exisitingUser = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!exisitingUser) {
        throw new BadRequestException('User not found');
      }

      const resetToken = await generateResetToken();

      if (!resetToken) {
        throw new InternalServerErrorException(
          'Reset token could not be generated',
        );
      }

      const updatedUser = await this.userRepository.update(
        {
          email: exisitingUser.email,
        },
        {
          resetToken: resetToken,
          resetTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
        },
      );

      if (!updatedUser) {
        throw new InternalServerErrorException('User could not be updated');
      }

      // TODO: Send email with reset token

      return {
        message: 'Reset token has been sent to your email',
      };
    } catch (error) {
      throw error;
    }
  }
}

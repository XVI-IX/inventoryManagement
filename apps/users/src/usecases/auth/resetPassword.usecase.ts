import { BadRequestException, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/users.repository';
import moment from 'moment';
import { IArgonService } from '@app/lib/domain/adapters';

export class ResetPasswordUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly argonService: IArgonService,
  ) {
    this.logger = new Logger(ResetPasswordUseCase.name);
  }

  async resetPassword(token: string, password: string) {
    try {
      const userWithToken = await this.userRepository.findOne({
        where: {
          resetToken: token,
        },
      });

      if (
        userWithToken &&
        moment(userWithToken?.resetTokenExpires).isBefore(moment())
      ) {
        throw new BadRequestException('Token has expired');
      }

      if (!userWithToken) {
        throw new BadRequestException('Invalid token');
      }

      const hashedPassword = await this.argonService.hashPassword(password);

      const updatedUser = await this.userRepository.update(
        {
          where: {
            email: userWithToken.email,
          },
        },
        {
          resetToken: null,
          resetTokenExpires: null,
          password: hashedPassword,
        },
      );

      if (!updatedUser) {
        throw new BadRequestException('Password could not be updated');
      }

      return {
        message: 'Password has been reset',
      };
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}

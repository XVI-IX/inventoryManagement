import {
  IArgonService,
  IJwtPayload,
  IJwtService,
} from '@app/lib/domain/adapters';
import { IUserRepository } from '../../domain/repositories/users.repository';
import { LoginUserPassword } from '../../infrastructure/common/schema/users.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { cleanUserResponse } from '@app/lib/infrastructure/helpers/helpers';

export class LoginUserPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly argonService: IArgonService,
    private readonly jwtService: IJwtService,
  ) {}

  async loginUserPassword(entity: LoginUserPassword) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: {
          email: entity.email,
        },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      if (!existingUser.isEmailVerified) {
        throw new BadRequestException('Please, verify your email address');
      }

      const isPasswordMatch = await this.argonService.comparePassword(
        entity.password,
        existingUser.password,
      );

      if (!isPasswordMatch) {
        throw new BadRequestException('Invalid Password');
      }

      const payload: IJwtPayload = {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.roleId,
      };
      const token = this.jwtService.generateToken(payload);

      return {
        token,
        user: cleanUserResponse(existingUser),
      };
    } catch (error) {
      throw error;
    }
  }
}

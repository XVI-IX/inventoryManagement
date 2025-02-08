import { IArgonService } from '@app/lib/domain/adapters';
import { IUserRepository } from '../../domain/repositories/users.repository';
import { CreateUserInput } from '../../infrastructure/common/schema/users.schema';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly argonService: IArgonService,
  ) {}

  async registerUser(user: CreateUserInput) {
    try {
      const exisitingUser = await this.userRepository.findOne({
        where: {
          email: user.email,
        },
      });

      if (exisitingUser) {
        throw new ConflictException('Email already in use');
      }

      const hash = await this.argonService.hashPassword(user.password);

      if (!hash) {
        throw new InternalServerErrorException('Password could not be hashed');
      }

      user.password = hash;
      const newUser = await this.userRepository.save(user);

      return newUser;
    } catch (error) {
      throw error;
    }
  }
}

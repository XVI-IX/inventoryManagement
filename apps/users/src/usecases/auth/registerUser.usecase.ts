import { IArgonService } from '@app/lib/domain/adapters';
import { IUserRepository } from '../../domain/repositories/users.repository';
import { CreateUserInput } from '../../infrastructure/common/schema/users.schema';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  cleanUserResponse,
  generateOTP,
} from '@app/lib/infrastructure/helpers/helpers';
import { IRolesRepository } from 'apps/rbac/src/domain/repositories/rbac.repository';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly argonService: IArgonService,
    private readonly roleRepository: IRolesRepository,
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
      user['verificationToken'] = generateOTP();

      const role = await this.roleRepository.findOne({
        where: {
          name: user.roleName,
        },
      });

      if (!role) {
        throw new ConflictException('Role does not exist');
      }
      delete user.roleName;
      user['role'] = role;
      const newUser = await this.userRepository.save(user);

      return cleanUserResponse(newUser);
    } catch (error) {
      throw error;
    }
  }
}

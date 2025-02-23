import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'apps/users/src/domain/repositories/users.repository';
import { IRolesRepository } from '../../domain/repositories/rbac.repository';
import { Users } from '@app/lib/infrastructure/services/database/entities/user.entity';

export class AssignRoleToUserUseCase {
  private readonly logger: Logger;

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly roleRepository: IRolesRepository,
  ) {
    this.logger = new Logger(AssignRoleToUserUseCase.name);
  }

  async execute(userId: string, roleId: string): Promise<Users> {
    try {
      const userExists = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        throw new NotFoundException('User not found');
      }

      const roleExists = await this.roleRepository.findOne({
        where: {
          id: roleId,
        },
      });

      if (!roleExists) {
        throw new NotFoundException('Role not found');
      }

      const updatedUser = await this.userRepository.update(
        { id: userId },
        {
          role: roleExists,
        },
      );

      if (!updatedUser) {
        throw new BadRequestException('Role could not be assigned to user');
      }

      return updatedUser;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}

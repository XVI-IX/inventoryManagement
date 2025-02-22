import { BadRequestException, Logger } from '@nestjs/common';
import { IRolesRepository } from '../../domain/repositories/rbac.repository';
import { Roles } from '@app/lib/infrastructure/services/database/entities/rbac.entity';

export class GetAllRolesUseCase {
  private readonly logger: Logger;
  constructor(private readonly rolesRepository: IRolesRepository) {
    this.logger = new Logger(GetAllRolesUseCase.name);
  }

  async execute(): Promise<Roles[]> {
    try {
      const roles = await this.rolesRepository.find({});

      if (!roles) {
        throw new BadRequestException('Roles coould not be retrieved');
      }

      return roles;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}

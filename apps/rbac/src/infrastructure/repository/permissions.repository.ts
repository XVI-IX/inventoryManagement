import { Inject, Injectable, Logger } from '@nestjs/common';
import { IPermissionsRepository } from '../../domain/repositories/rbac.repository';
import { Repository } from 'typeorm';
import { Permissions } from '@app/lib/infrastructure/services/database/entities/rbac.entity';

@Injectable()
export class PermissionsRepository implements IPermissionsRepository {
  private readonly logger: Logger;
  constructor(
    @Inject('PERMISSIONS_REPOSITORY')
    private readonly permissionsRepository: Repository<Permissions>,
  ) {
    this.logger = new Logger(PermissionsRepository.name);
  }

  async save(entity: Partial<Permissions>): Promise<Permissions> {
    try {
      const permissionExists = await this.permissionsRepository
        .createQueryBuilder('permissions')
        .where('permissions.name COLLATE utf8mb4_general_ci = :name', {
          name: entity.name,
        })
        .getOne();

      if (permissionExists) {
        return permissionExists;
      }

      const permission = await this.permissionsRepository.save(entity);

      return permission;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}

import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { IRolesRepository } from '../../domain/repositories/rbac.repository';
import {
  IFindOptions,
  IFindOneOptions,
} from '@app/lib/domain/adapters/query.interface';
import { Roles } from '@app/lib/infrastructure/services/database/entities/rbac.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesRepository implements IRolesRepository {
  private readonly logger: Logger;
  constructor(
    @Inject('ROLES_REPOSITORY')
    private readonly rolesRepository: Repository<Roles>,
  ) {
    this.logger = new Logger(RolesRepository.name);
  }

  async getRolesWithPermission(
    name?: string,
    permissionId?: string,
  ): Promise<Roles[]> {
    try {
      const roleExists = await this.rolesRepository.find({
        where: {},
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async save?(entity: Partial<Roles>): Promise<Roles> {
    try {
      const roleExists = await this.rolesRepository.find({
        where: {
          name: entity.name,
        },
      });

      if (roleExists) {
        throw new ConflictException('Role already exists');
      }

      const newRole = await this.rolesRepository.save(entity);

      if (!newRole) {
        throw new BadRequestException(
          'Role could not be created, please try again',
        );
      }

      return newRole;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async find?(condition: IFindOptions<Roles>): Promise<Roles[]> {
    throw new Error('Method not implemented.');
  }

  async findOne?(condition: IFindOneOptions<Roles>): Promise<Roles> {
    throw new Error('Method not implemented.');
  }

  async update?(
    condition: Partial<Roles>,
    entity: Partial<Roles>,
  ): Promise<Roles> {
    throw new Error('Method not implemented.');
  }

  async delete?(condition: Partial<Roles>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
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
    permissionId: string,
    options?: IFindOptions<Roles>,
  ): Promise<Roles[]> {
    try {
      const roles = await this.rolesRepository.find({
        relations: {
          permissions: true,
        },
        where: {
          permissions: {
            id: permissionId,
          },
        },
        take: options.take,
        skip: options.skip,
        order: options.order,
      });
      if (!roles) {
        throw new BadRequestException(
          'Roles with permission could not be retrieved',
        );
      }

      return roles;
    } catch (error) {
      this.logger.error(error);
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

      if (roleExists.length > 0) {
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
    try {
      const role = await this.rolesRepository.find({
        where: condition.where,
        take: condition.take,
        skip: condition.skip,
        order: condition.order,
      });

      if (!role) {
        throw new BadRequestException('Roles could not be retrieved');
      }

      if (role.length === 0) {
        throw new NotFoundException('Roles not found');
      }

      return role;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne?(condition: IFindOneOptions<Roles>): Promise<Roles> {
    try {
      const role = await this.rolesRepository.findOne({
        where: condition.where,
      });

      return role;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async update?(
    condition: Partial<Roles>,
    entity: Partial<Roles>,
  ): Promise<Roles> {
    try {
      const roleExists = await this.rolesRepository.findOne({
        where: { ...condition },
      });

      if (!roleExists) {
        throw new NotFoundException('Role not found');
      }

      const updatedRole = await this.rolesRepository.update(condition, entity);

      if (!updatedRole) {
        throw new BadRequestException('Role could not be updated');
      }

      const getRole = await this.rolesRepository.findOne({
        where: {
          id: roleExists.id,
        },
      });

      return getRole;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async delete?(condition: Partial<Roles>): Promise<boolean> {
    try {
      const roleExists = await this.rolesRepository.findOne({
        where: { ...condition },
      });

      if (!roleExists) {
        throw new BadRequestException('Role could not be retrieved');
      }

      const deletedRole = await this.rolesRepository.delete({ ...condition });

      if (!deletedRole) {
        throw new BadRequestException('Role could not be deleted');
      }

      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

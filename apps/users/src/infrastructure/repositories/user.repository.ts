import { Users } from '@app/lib/infrastructure/services/database/entities/user.entity';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/users.repository';
import {
  IFindOneOptions,
  IFindOptions,
} from '@app/lib/domain/adapters/query.interface';
import { cleanUserResponse } from '@app/lib/infrastructure/helpers/helpers';

@Injectable()
export class UsersRepository implements IUserRepository {
  private readonly logger: Logger;
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: Repository<Users>,
  ) {
    this.logger = new Logger(UsersRepository.name);
  }

  async getUsersWithRole(roleName: string): Promise<Users[]> {
    try {
      const users = await this.usersRepository.find({
        relations: {
          role: true,
        },
        where: {
          role: {
            name: roleName,
          },
        },
      });

      if (!users) {
        throw new BadRequestException('Users could not be retrieved');
      }

      return cleanUserResponse(users) as Users[];
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async save?(entity: Partial<Users>): Promise<Users> {
    try {
      return await this.usersRepository.save(entity);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async find?(condition: IFindOptions<Users>): Promise<Users[]> {
    try {
      const users = await this.usersRepository.find({
        where: condition.where,
        skip: condition.skip,
        take: condition.take,
        order: condition.order,
        relations: {
          role: true,
        },
      });

      if (!users) {
        throw new BadRequestException('Users could not be retrieved');
      }

      return users;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async findOne?(condition: IFindOneOptions<Users>): Promise<Users> {
    try {
      const user = await this.usersRepository.findOne({
        ...condition,
        relations: { role: true },
      });

      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async update?(
    condition: Partial<Users>,
    entity: Partial<Users>,
  ): Promise<Users> {
    try {
      const user = await this.usersRepository.update(condition, entity);

      return user as unknown as Users;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async delete?(condition: Partial<Users>): Promise<boolean> {
    try {
      const user = await this.usersRepository.delete(condition);

      if (!user) {
        throw new BadRequestException('User could not be deleted');
      }

      return true;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}

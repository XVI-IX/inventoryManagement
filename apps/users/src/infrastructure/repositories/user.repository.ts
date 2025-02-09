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

@Injectable()
export class UsersRepository implements IUserRepository {
  private readonly logger: Logger;
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: Repository<Users>,
  ) {
    this.logger = new Logger(UsersRepository.name);
  }

  // findUsersByRole(roleId: string): Promise<Users> {
  //   throw new Error('Method not implemented.');
  // }
  // findUsersByStatus(status: string): Promise<Users> {
  //   throw new Error('Method not implemented.');
  // }
  // findUsersCountByRole(): Promise<any> {
  //   throw new Error('Method not implemented.');
  // }

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
      const users = await this.usersRepository.find(condition);

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
      const user = await this.usersRepository.findOne(condition);

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

import { IBaseRepository } from '@app/lib/domain/repositories';
import { Users } from '@app/lib/infrastructure/services/database/entities/user.entity';

export interface IUserRepository extends IBaseRepository<Users> {
  // findUsersByRole(roleId: string): Promise<Users>;
  // findUsersByStatus(status: string): Promise<Users>;
  // findUsersCountByRole(): Promise<any>;
}

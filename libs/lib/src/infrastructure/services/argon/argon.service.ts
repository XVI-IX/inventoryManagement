import { IArgonService } from '@app/lib/domain/adapters';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class ArgonService implements IArgonService {
  async hashPassword(password: string): Promise<string> {
    try {
      const hash = await argon.hash(password);

      if (!hash) {
        throw new InternalServerErrorException('Error hashing password');
      }

      return hash;
    } catch (error) {
      throw error;
    }
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      const match = await argon.verify(hash, password);

      if (!match) {
        throw new InternalServerErrorException('Error comparing password');
      }

      return match;
    } catch (error) {
      throw error;
    }
  }
}

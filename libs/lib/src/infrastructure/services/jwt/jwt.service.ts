import { IJwtPayload, IJwtService } from '@app/lib/domain/adapters';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { envConfig } from '../../config/environment.config';

@Injectable()
export class JWTokenService implements IJwtService {
  generateToken(payload: IJwtPayload): string {
    try {
      const token = jwt.sign(payload, envConfig.getJWTSecret(), {
        expiresIn: envConfig.getJWTExpiration(),
      });

      if (!token) {
        throw new InternalServerErrorException('Error generating token');
      }

      return token;
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const verified = await jwt.verify(token, envConfig.getJWTSecret(), {});

      if (!verified) {
        throw new InternalServerErrorException('Token expired');
      }

      return verified;
    } catch (error) {
      throw error;
    }
  }
}

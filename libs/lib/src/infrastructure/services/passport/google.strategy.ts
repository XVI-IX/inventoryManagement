import { envConfig } from '@app/lib/infrastructure/config/environment.config';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersRepository } from 'apps/users/src/infrastructure/repositories/user.repository';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger;
  constructor(private readonly userRepository: UsersRepository) {
    super({
      clientID: envConfig.getGoogleClientId(),
      clientSecret: envConfig.getGoogleClientSecret(),
      callbackURL: envConfig.getGoogleCallbackUrl(),
      scope: envConfig.getGoogleScope(),
    });
    this.logger = new Logger(GoogleStrategy.name);
  }

  async validate(
    accessToken: any,
    refreshToken: any,
    profile: any,
    cb: any,
  ): Promise<unknown> {
    try {
      const user = await this.userRepository.find({
        where: {
          email: profile.emails[0].value,
          googleProfileId: profile.id,
        },
      });

      if (user) {
        return cb(null, user);
      }

      const newUser = await this.userRepository.save({
        email: profile.emails[0].value,
        googleProfileId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        userName: profile.displayName,
      });

      if (!newUser) {
        throw new BadRequestException("User can't be created");
      }

      return cb(null, newUser);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}

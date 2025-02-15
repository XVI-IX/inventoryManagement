import { IPassportService } from '@app/lib/domain/adapters/passport.interface';
import { envConfig } from '@app/lib/infrastructure/config/environment.config';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersRepository } from 'apps/users/src/infrastructure/repositories/user.repository';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy
  extends PassportStrategy(Strategy)
  implements IPassportService
{
  private readonly logger: Logger;
  constructor(private readonly userRepository: UsersRepository) {
    super({
      clientID: envConfig.getGoogleClientId(),
      clientSecret: envConfig.getGoogleClientSecret(),
      callbackURL: envConfig.getGoogleCallbackUrl(),
      scope: ['profile', 'email'],
    });
    this.logger = new Logger(GoogleStrategy.name);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: any,
  ): Promise<unknown> {
    try {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
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
        profileImage: profile.photos[0].value,
        isEmailVerified: profile.emails[0].verified,
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

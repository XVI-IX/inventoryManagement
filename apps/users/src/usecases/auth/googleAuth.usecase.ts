import { IPassportService } from '@app/lib/domain/adapters/passport.interface';
import { Logger } from '@nestjs/common';

export class GoogleAuthUseCase {
  private readonly logger: Logger;
  constructor(private readonly passportService: IPassportService) {
    this.logger = new Logger(GoogleAuthUseCase.name);
  }

  async validate() {}
}

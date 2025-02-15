export interface IPassportService {
  validate(
    accessToken: any,
    refreshToken: any,
    profile: any,
    cb: any,
  ): Promise<unknown>;
}

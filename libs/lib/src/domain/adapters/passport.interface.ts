export interface IPassportService {
  validateGoogleProfile(profile: any): Promise<any>;
}

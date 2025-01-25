export interface IEnvironmentInterface {
  getEnvironment(): string;
  getPort(): number;
  getJWTSecret(): string;
  getJWTExpiration(): string;
  getDatabaseHost(): string;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabaseName(): string;
  getDatabasePort(): number;
  getMicroServiceHost(): string;
  getUserServicePort(): number;
  getSupplierServicePort(): number;
  getInventoryServicePort(): number;
  getSupplierServiceHost(): string;
  getNotificationServicePort(): number;
  getOrderServicePort(): number;
  getProductServicePort(): number;
  getRbacServicePort(): number;
  getAnalyticsServicePort(): number;
}

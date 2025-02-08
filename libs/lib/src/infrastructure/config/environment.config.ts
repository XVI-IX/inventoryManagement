import { IEnvironmentInterface } from '@app/lib/domain/config/environment.interface';
import { config } from 'dotenv';
import * as env from 'env-var';

config();

class EnviromentConfig implements IEnvironmentInterface {
  getEnvironment(): string {
    return env.get('NODE_ENV').asString() || 'development';
  }

  getPort(): number {
    return env.get('PORT').asInt();
  }

  getMicroservicePort(): number {
    return env.get('MICROSERVICE_PORT').asInt();
  }

  getJWTSecret(): string {
    return env.get('JWT_SECRET').asString();
  }

  getJWTExpiration(): string {
    return env.get('JWT_EXPIRATION').asString();
  }

  getDatabaseHost(): string {
    return env.get('DATABASE_HOST').asString();
  }
  getDatabaseUser(): string {
    return env.get('DATABASE_USER').asString();
  }
  getDatabasePassword(): string {
    return env.get('DATABASE_PASSWORD').asString();
  }
  getDatabaseName(): string {
    return env.get('DATABASE_NAME').asString();
  }
  getDatabasePort(): number {
    return env.get('DATABASE_PORT').asInt();
  }
  getMicroServiceHost(): string {
    return env.get('MICROSERVICE_HOST').asString();
  }
  getUserServicePort(): number {
    return env.get('USER_SERVICE_PORT').asInt();
  }
  getSupplierServicePort(): number {
    return env.get('SUPPLIER_SERVICE_PORT').asInt();
  }
  getInventoryServicePort(): number {
    return env.get('INVENTORY_SERVICE_PORT').asInt();
  }
  getSupplierServiceHost(): string {
    return env.get('SUPPLIER_SERVICE_HOST').asString();
  }
  getNotificationServicePort(): number {
    return env.get('NOTIFICATION_SERVICE_PORT').asInt();
  }
  getOrderServicePort(): number {
    return env.get('ORDER_SERVICE_PORT').asInt();
  }
  getProductServicePort(): number {
    return env.get('PRODUCT_SERVICE_PORT').asInt();
  }
  getRbacServicePort(): number {
    return env.get('RBAC_SERVICE_PORT').asInt();
  }
  getAnalyticsServicePort(): number {
    return env.get('ANALYTICS_SERVICE_PORT').asInt();
  }
}

export const envConfig = new EnviromentConfig();

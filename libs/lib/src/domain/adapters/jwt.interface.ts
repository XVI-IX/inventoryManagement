/**
 * @name IJwtPayload
 * @description Interface for JWT Payload
 *
 * @property id - User ID
 * @property email - User email
 * @property role - User role
 */
export interface IJwtPayload {
  id: string;
  email: string;
  rolw: string;
}

/**
 * @name IJwtService
 * @description Interface for JwtService
 *
 * @method generateToken - Generates a JWT token
 * @method verifyToken - Verifies a JWT token
 */
export interface IJwtService {
  generateToken(payload: IJwtPayload): string;
  verifyToken(token: string): Promise<any>;
}

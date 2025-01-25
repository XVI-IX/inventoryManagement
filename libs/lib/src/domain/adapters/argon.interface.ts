/**
 * @name IArgonService
 * @description Interface for ArgonService
 *
 * @method hashPassword - Hashes a password
 * @method comparePassword - Compares a password with a hash
 */
export interface IArgonService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}

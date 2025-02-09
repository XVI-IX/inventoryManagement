import * as crypto from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { Users } from '../services/database/entities/user.entity';

export const generateResetToken = async (): Promise<string> => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = await bcrypt.hash(token, 10);

  return hashedToken;
};

export const cleanUserResponse = (user: Users | Users[]) => {
  if (Array.isArray(user)) {
    return user.map((u) => {
      delete u.password;
      delete u.resetToken;
      delete u.resetTokenExpires;

      return u;
    });
  } else {
    delete user.password;
    delete user.resetToken;
    delete user.resetTokenExpires;

    return user;
  }
};

import crypto from 'node:crypto';
import bcrypt from 'bcrypt';

export const generateResetToken = async (): Promise<string> => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = await bcrypt.hash(token, 10);

  return hashedToken;
};

export interface IBcryptService {
  hash(text: string): Promise<string>;
  compare(text: string, hashed: string): Promise<boolean>;
}

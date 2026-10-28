import { hash, compare } from "bcrypt";

export interface IPasswordHasher {
  hash(password: string): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>;
}

export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly saltRounds: number;

  constructor(saltRounds = 10) {
    this.saltRounds = saltRounds;
  }

  async hash(password: string): Promise<string> {
    return hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}

export const passwordHasher = new BcryptPasswordHasher(10);

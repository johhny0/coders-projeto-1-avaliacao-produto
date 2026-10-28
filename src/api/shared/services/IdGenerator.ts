import { nanoid } from "nanoid";

export interface IIdGenerator {
  generate(): string;
}

export class NanoIdGenerator implements IIdGenerator {
  generate(): string {
    return nanoid();
  }
}

export const idGenerator = new NanoIdGenerator();

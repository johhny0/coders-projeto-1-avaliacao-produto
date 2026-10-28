export interface IDateService {
  now(): Date;
  nowIso(): string;
}

export class DateService implements IDateService {
  now(): Date {
    return new Date();
  }

  nowIso(): string {
    return this.now().toISOString();
  }
}

export const dateService = new DateService();

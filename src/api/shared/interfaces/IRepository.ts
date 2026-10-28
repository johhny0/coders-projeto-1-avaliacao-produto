export interface IRepository<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  findAll(params?: unknown): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: CreateDTO): Promise<T>;
  update(id: string, data: UpdateDTO): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

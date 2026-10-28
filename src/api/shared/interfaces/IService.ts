export interface IService<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  findAll(params?: unknown): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(data: CreateDTO): Promise<T>;
  update(id: string, data: UpdateDTO): Promise<T>;
  delete(id: string): Promise<void>;
}

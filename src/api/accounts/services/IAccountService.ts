import { CreateAccountDTO, CreateAccountResponse } from "@/api/accounts/dtos/CreateAccountDTO";

export interface IAccountService {
  createAccount(data: unknown): Promise<CreateAccountResponse>;
}

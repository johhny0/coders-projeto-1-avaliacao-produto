import { Account } from "@/api/accounts/entities/Account";
import { CreateAccountInput } from "@/api/accounts/dtos/CreateAccountDTO";

export interface IAccountRepository {
  create(data: CreateAccountInput & { id: string }): Promise<Account>;
  findByEmail(email: string): Promise<Account | null>;
}

import { IAccountService } from "@/api/accounts/services/IAccountService";
import { IAccountRepository } from "@/api/accounts/repositories/IAccountRepository";
import { IAccountValidator } from "@/api/accounts/validators/AccountValidator";
import { IPasswordHasher } from "@/api/shared/services/PasswordHasher";
import { IIdGenerator } from "@/api/shared/services/IdGenerator";
import { IDateService } from "@/api/shared/services/DateService";
import { CreateAccountResponse } from "@/api/accounts/dtos/CreateAccountDTO";
import { BadRequestError, AppError } from "@/api/shared/errors/AppError";

export class AccountService implements IAccountService {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly accountValidator: IAccountValidator,
    private readonly passwordHasher: IPasswordHasher,
    private readonly idGenerator: IIdGenerator,
    private readonly dateService: IDateService,
  ) {}

  async createAccount(data: unknown): Promise<CreateAccountResponse> {
    const validated = this.accountValidator.validateCreate(data);

    const existing = await this.accountRepository.findByEmail(validated.email);
    if (existing) {
      throw new BadRequestError("Erro ao criar conta");
    }

    const hashedPassword = await this.passwordHasher.hash(validated.password);
    const id = this.idGenerator.generate();
    const now = this.dateService.nowIso();

    try {
      await this.accountRepository.create({
        id,
        first_name: validated.firstName,
        last_name: validated.lastName,
        email: validated.email,
        password: hashedPassword,
        active: true,
        created_at: now,
        updated_at: now,
      });

      return {
        success: true,
        id,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new BadRequestError("Erro ao criar conta");
    }
  }
}

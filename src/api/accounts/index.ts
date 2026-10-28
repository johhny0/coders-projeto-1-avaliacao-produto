import { AccountRepository } from "@/api/accounts/repositories/AccountRepository";
import { AccountValidator } from "@/api/accounts/validators/AccountValidator";
import { AccountService } from "@/api/accounts/services/AccountService";
import { AccountController } from "@/api/accounts/controllers/AccountController";
import { passwordHasher } from "@/api/shared/services/PasswordHasher";
import { idGenerator } from "@/api/shared/services/IdGenerator";
import { dateService } from "@/api/shared/services/DateService";
import { supabaseAdmin } from "@/lib/supabase/server";

export function createAccountController() {
  const repository = new AccountRepository(supabaseAdmin);
  const validator = new AccountValidator();
  const service = new AccountService(repository, validator, passwordHasher, idGenerator, dateService);
  const controller = new AccountController(service);
  return controller;
}

export { AccountController } from "@/api/accounts/controllers/AccountController";
export { AccountService } from "@/api/accounts/services/AccountService";
export { AccountRepository } from "@/api/accounts/repositories/AccountRepository";
export { AccountValidator } from "@/api/accounts/validators/AccountValidator";

import { BadRequestError } from "@/api/shared/errors/AppError";
import { CreateAccountDTO } from "@/api/accounts/dtos/CreateAccountDTO";

export interface IAccountValidator {
  validateCreate(data: unknown): CreateAccountDTO;
}

export class AccountValidator implements IAccountValidator {
  validateCreate(data: unknown): CreateAccountDTO {
    if (!data || typeof data !== "object") {
      throw new BadRequestError("Má formatação de dados");
    }

    const body = data as Record<string, unknown>;
    const { firstName, lastName, email, password, confirmPassword } = body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      throw new BadRequestError("Má formatação de dados");
    }

    if (password !== confirmPassword) {
      throw new BadRequestError("Má formatação de dados");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Má formatação de dados");
    }

    if (password.length < 6) {
      throw new BadRequestError("Má formatação de dados");
    }

    return {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password,
      confirmPassword,
    };
  }
}

export const accountValidator = new AccountValidator();

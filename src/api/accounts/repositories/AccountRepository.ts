import { SupabaseClient } from "@supabase/supabase-js";
import { IAccountRepository } from "@/api/accounts/repositories/IAccountRepository";
import { Account } from "@/api/accounts/entities/Account";
import { CreateAccountInput } from "@/api/accounts/dtos/CreateAccountDTO";
import { supabaseAdmin } from "@/lib/supabase/server";

export class AccountRepository implements IAccountRepository {
  constructor(private readonly db: SupabaseClient = supabaseAdmin) {}

  async create(data: CreateAccountInput & { id: string }): Promise<Account> {
    const { data: account, error } = await this.db
      .from("accounts")
      .insert({
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        active: data.active,
        created_at: data.created_at,
        updated_at: data.updated_at,
      })
      .select()
      .single();

    if (error || !account) {
      throw error || new Error("Failed to create account");
    }

    return account as Account;
  }

  async findByEmail(email: string): Promise<Account | null> {
    const { data, error } = await this.db
      .from("accounts")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw error;
    }

    return (data as Account) || null;
  }
}

export const accountRepository = new AccountRepository(supabaseAdmin);

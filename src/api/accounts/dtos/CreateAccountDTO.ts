export interface CreateAccountDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CreateAccountInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateAccountResponse {
  success: boolean;
  id: string;
}

export interface Account {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PublicAccount {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

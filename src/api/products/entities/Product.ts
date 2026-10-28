export interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  external_link: string;
  score: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProductDTO {
  name: string;
  description?: string | null;
  image_url?: string | null;
  external_link: string;
}

export interface CreateProductInput extends CreateProductDTO {
  id: string;
  score: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductResponseDTO extends CreateProductDTO {
  id: string;
  score: boolean;
  created_at: string;
  updated_at: string;
}

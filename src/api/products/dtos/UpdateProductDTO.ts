export interface UpdateProductDTO {
  name?: string;
  description?: string | null;
  image_url?: string | null;
  external_link?: string;
  score?: boolean;
}

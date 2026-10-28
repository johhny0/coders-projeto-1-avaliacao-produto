# Plan 2: CRUD de Produtos - API Aberta (Sem Autenticação)

## Goal
Create a complete CRUD for products in an open API (no authentication required), following the patterns established after refactoring or alongside it. The API should be RESTful, well-structured with OOP principles, and integrate with Supabase.

## Current State
- Products API exists partially: `src/app/api/v1/products/route.ts` has GET (list with cursor pagination) and POST (create)
- Products table structure not fully visible, but from code: `id`, `name`, `description`, `image_url`, `external_link`, `score` (boolean?), `created_at`, `updated_at`
- No individual product endpoints (GET by id, PUT/PATCH, DELETE)
- Uses versioning (`/api/v1/products`)

## Requirements
- Open API, no authentication
- Full CRUD operations
- RESTful endpoints
- Follow OOP best practices (Controller → Service → Repository)
- No versioning in routes (as per refactor plan)
- Proper validation
- Appropriate HTTP status codes
- Error handling

## API Endpoints Design

Base path: `/api/products` (no versioning)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | List all products (with pagination) | None |
| GET | `/api/products/[id]` | Get product by ID | None |
| POST | `/api/products` | Create new product | None |
| PUT/PATCH | `/api/products/[id]` | Update product (full/partial) | None |
| DELETE | `/api/products/[id]` | Delete product | None |

## Data Model
Based on existing usage:
```typescript
interface Product {
  id: string;           // nanoid
  name: string;
  description: string | null;
  image_url: string | null;
  external_link: string;
  score: boolean;       // appears to be set to false on create
  created_at: string;
  updated_at: string;
}
```

## Validation Rules
- **POST**: `name` required (string), `external_link` required (string, valid URL?), `description` optional, `image_url` optional (valid URL if provided)
- **PUT/PATCH**: At least one field to update, validate types and formats
- **GET by id/DELETE**: Validate ID format

## OOP Structure

Following the refactor pattern:
```
src/api/products/
├── entities/
│   └── Product.ts           # Entity/interface/types
├── validators/
│   └── productValidator.ts  # Validation schemas
├── repositories/
│   ├── IProductRepository.ts
│   └── ProductRepository.ts # Supabase implementation
├── services/
│   └── ProductService.ts    # Business logic
├── controllers/
│   └── ProductController.ts # HTTP orchestration
└── index.ts
```

## Implementation Details

### Repository Layer
```typescript
interface IProductRepository {
  findAll(params: PaginationParams): Promise<{ products: Product[], hasMore: boolean }>;
  findById(id: string): Promise<Product | null>;
  create(product: CreateProductDTO): Promise<Product>;
  update(id: string, data: UpdateProductDTO): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}
```

### Service Layer
- Business rules validation
- Handle defaults (score: false on create)
- Timestamp management
- ID generation
- Orchestrate repository calls

### Controller Layer
- Parse request (query, params, body)
- Call service methods
- Format responses with appropriate status codes
- Error handling

## Next.js Route Handlers (Thin Adapters)

Keep route handlers minimal:
```typescript
// src/app/api/products/route.ts
import { ProductController } from "@/api/products/controllers/ProductController";
export async function GET(req: NextRequest) {
  return ProductController.getAll(req);
}
export async function POST(req: NextRequest) {
  return ProductController.create(req);
}

// src/app/api/products/[id]/route.ts
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return ProductController.getById(req, params.id);
}
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return ProductController.update(req, params.id);
}
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  return ProductController.update(req, params.id);
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return ProductController.delete(req, params.id);
}
```

## Status Codes
- `200 OK` - GET successful, DELETE successful
- `201 Created` - POST successful
- `400 Bad Request` - Validation errors, malformed data
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Unexpected errors (but keep simple)

## Steps to Implement

### Phase 1: Setup Structure
1. Create `src/api/products/` directory with all layers
2. Define entities and DTOs
3. Create validators

### Phase 2: Repository
1. Implement `IProductRepository` interface
2. Implement `ProductRepository` with Supabase
3. Handle queries (pagination, find by id, CRUD operations)

### Phase 3: Service
1. Implement `ProductService` with business logic
2. Validation using validators
3. Handle defaults and timestamps

### Phase 4: Controller
1. Implement `ProductController` 
2. Request parsing and response formatting
3. Error handling

### Phase 5: Routes
1. Create route handlers in `src/app/api/products/` (no versioning)
2. Create dynamic route `[id]/route.ts`
3. Update/remove old v1 routes if needed

### Phase 6: Testing & Validation
1. Test all CRUD operations
2. Test validation errors
3. Test pagination
4. Test edge cases (non-existent id)
5. Ensure no auth required

## Checklist
- [ ] Create products domain structure (OOP layers)
- [ ] Implement GET /api/products (list with pagination)
- [ ] Implement GET /api/products/[id] (get by id)
- [ ] Implement POST /api/products (create)
- [ ] Implement PUT/PATCH /api/products/[id] (update)
- [ ] Implement DELETE /api/products/[id] (delete)
- [ ] Add validation for all inputs
- [ ] No authentication required
- [ ] No versioning in routes
- [ ] Follow OOP best practices
- [ ] Proper HTTP status codes
- [ ] Error messages in appropriate format

## Notes
- Keep consistent with existing codebase style (Portuguese error messages as seen, or follow project conventions)
- Use same patterns as refactored sign-up
- Ensure no breaking changes to existing products functionality during migration
- Open API means no middleware/auth checks

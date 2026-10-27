"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string | null;
    image_url?: string | null;
    external_link: string;
    score?: boolean | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="h-full transition-shadow hover:shadow-md">
        {product.image_url ? (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
        <CardHeader>
          <CardTitle className="line-clamp-2">{product.name}</CardTitle>
        </CardHeader>
        {product.description ? (
          <CardContent>
            <CardDescription className="line-clamp-3">
              {product.description}
            </CardDescription>
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}

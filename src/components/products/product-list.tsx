"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "./product-card";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  image_url?: string | null;
  external_link: string;
  score?: boolean | null;
  created_at: string;
  updated_at: string;
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = async (cursor?: string | null) => {
    try {
      setLoading(true);
      const url = cursor
        ? `/api/v1/products?cursor=${encodeURIComponent(cursor)}&limit=10`
        : `/api/v1/products?limit=10`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.products) {
        if (cursor) {
          setProducts((prev) => [...prev, ...data.products]);
        } else {
          setProducts(data.products);
        }
        setNextCursor(data.nextCursor);
      } else if (Array.isArray(data)) {
        // Fallback if API returns array directly
        if (cursor) {
          setProducts((prev) => [...prev, ...data]);
        } else {
          setProducts(data);
        }
        setNextCursor(null);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (loading || !nextCursor || !loadMoreRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor) {
          fetchProducts(nextCursor);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, nextCursor]);

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-graphite">Carregando produtos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-graphite">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {nextCursor && (
        <div ref={loadMoreRef} className="flex items-center justify-center py-6">
          {loading ? (
            <p className="text-graphite">Carregando mais...</p>
          ) : (
            <div className="h-1" />
          )}
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductFilterResponse } from 'types';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { ProductList } from '../components/Product/ProductList';

export const ProductCategoryView = () => {
  const [products, setProducts] = useState<ProductFilterResponse[]>([]);
  const { categoryName } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/product/category/${categoryName}`);
      const data:ProductFilterResponse[] = await res.json();
      setProducts(data);
    })();
  }, [products]);

  if (products.length === 0) {
    return <LoadingSpinner />;
  }

  return <ProductList products={products} />;
};

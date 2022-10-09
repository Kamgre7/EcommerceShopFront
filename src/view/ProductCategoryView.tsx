import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryFilterResponse, ProductFilterResponse } from 'types';
import { Flex } from '@chakra-ui/react';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { ProductList } from '../components/Product/ProductList';
import { ShopContext } from '../context/shop.context';
import { Category } from '../components/Category/Category';

export const ProductCategoryView = () => {
  const [products, setProducts] = useState<ProductFilterResponse[]>([]);
  const { categoryName } = useParams();

  const context = useContext(ShopContext);

  if (!context) {
    return null;
  }

  const { categories } = context;

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

  const singleCategory = categories.find((category) => category.id === products[0].category) as CategoryFilterResponse;

  return (

    <Flex
      direction="column"
    >
      <Category category={singleCategory} />
      <ProductList products={products} />
    </Flex>
  );
};

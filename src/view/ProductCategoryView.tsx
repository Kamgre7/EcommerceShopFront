import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CategoryFilterResponse, ProductFilterResponse } from 'types';
import { Flex } from '@chakra-ui/react';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { ProductList } from '../components/Product/ProductList';
import { ShopContext } from '../context/shop.context';
import { Category } from '../components/Category/Category';

type LocationProps = {
  state: {
    from: Location;
    category: string;
  }
};

export const ProductCategoryView = () => {
  const [products, setProducts] = useState<ProductFilterResponse[]>([]);
  const location = useLocation() as unknown as LocationProps;

  const context = useContext(ShopContext);

  if (!context) {
    return null;
  }

  const { categories } = context;

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/product/category/${location.state.category}`);
      const data:ProductFilterResponse[] = await res.json();
      console.log(products);
      setProducts(data);
    })();
  }, [products]);

  if (products.length === 0) {
    return <LoadingSpinner />;
  }
  const singleCategory = categories.find((category) => category.id === location.state.category) as CategoryFilterResponse;
  return (

    <Flex
      direction="column"
    >
      <Category category={singleCategory} />
      <ProductList products={products} />
    </Flex>
  );
};

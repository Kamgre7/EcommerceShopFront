import React from 'react';
import { ProductFilterResponse } from 'types';
import { ProductList } from './ProductList';

interface Props {
  rankingProducts: ProductFilterResponse[]
}

export const RankingProducts = ({ rankingProducts }: Props) => <ProductList products={rankingProducts} />;

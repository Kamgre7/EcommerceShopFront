import { createContext } from 'react';
import { CategoryFilterResponse, ProductFilterResponse } from 'types';

interface ShopContextType {
  categories: CategoryFilterResponse[];
  products: ProductFilterResponse[];
  rankingProducts: ProductFilterResponse[];
  addCategories?: (newCategory: CategoryFilterResponse) =>void;
  loadCategories: (allCategories: CategoryFilterResponse[]) =>void;
  addProducts?: (newProducts: ProductFilterResponse) => void;
  loadProducts: (allProducts: ProductFilterResponse[]) => void;
  removeProduct?: (productId: string) =>void;
  loadRankingProducts: (rankingProducts: ProductFilterResponse[])=>void;
}

export const ShopContext = createContext < ShopContextType | null >(null);

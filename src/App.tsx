import * as React from 'react';
import {
  ChakraProvider,
  theme, Flex,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  CategoryFilterResponse, ProductFilterResponse, UserRole,
} from 'types';
import { LoginForm } from './components/Forms/LoginForm';
import { NotFoundView } from './view/NotFoundView';
import { ForgotPasswordForm } from './components/Forms/ForgotPasswordForm';
import { RegisterForm } from './components/Forms/RegisterForm';
import { HomeView } from './view/HomeView';
import { ProductForm } from './components/Forms/ProductForm';
import { ShopContext } from './context/shop.context';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import { SingleProductDetails } from './components/Product/SingleProductDetails';
import { ProductCategoryView } from './view/ProductCategoryView';
import { RequiredAuth } from './components/RequiredAuth/RequiredAuth';
import { UnauthorizedView } from './view/UnauthorizedView';
import { NavigationView } from './view/NavigationView';
import { FooterView } from './view/FooterView';
import { BasketView } from './view/BasketView';
import { OrderView } from './view/OrderView';
import { AdminView } from './view/AdminView';
import { OrderHistory } from './components/Order/OrderHistory';
import { SearchProductView } from './view/SearchProductView';

export const App = () => {
  const [categories, setCategories] = useState<CategoryFilterResponse[]>([]);
  const [products, setProducts] = useState<ProductFilterResponse[]>([]);
  const [rankingProducts, setRankingProducts] = useState<ProductFilterResponse[]>([]);

  const loadCategories = (allCategories: CategoryFilterResponse[]) => {
    setCategories(allCategories);
  };

  const loadProducts = (allProducts: ProductFilterResponse[]) => {
    setProducts(allProducts);
  };

  const loadRankingProducts = (rankingProduct: ProductFilterResponse[]) => {
    setRankingProducts(rankingProduct);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/product/ranking');
      const data:ProductFilterResponse[] = await res.json();
      loadRankingProducts(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/category/');
      const data:CategoryFilterResponse[] = await res.json();
      loadCategories(data);
    })();
  }, []);

  if (rankingProducts.length === 0 || categories.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <ChakraProvider theme={theme}>
      <ShopContext.Provider value={{
        products,
        categories,
        rankingProducts,
        loadRankingProducts,
        loadProducts,
        loadCategories,
      }}
      >
        <Flex direction="column" minH="100vh">
          <NavigationView />

          <Flex justify="center" align="flex-start" flexGrow={1}>
            <Routes>

              <Route path="/" element={<HomeView />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/restart-password" element={<ForgotPasswordForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/product/:id" element={<SingleProductDetails />} />
              <Route path="/product/find/:searchTerm" element={<SearchProductView />} />
              <Route path="/product/category/:categoryName" element={<ProductCategoryView />} />
              <Route path="/unauthorized" element={<UnauthorizedView />} />

              <Route element={<RequiredAuth allowedRole={[UserRole.ADMIN]} />}>
                <Route path="/product/form" element={<ProductForm />} />
                {/* <Route path="/category/form" element={<AddCategoryForm/>}/>  */}
                <Route path="/admin" element={<AdminView />} />
              </Route>

              <Route element={<RequiredAuth allowedRole={[UserRole.ADMIN, UserRole.USER]} />}>
                <Route path="/basket" element={<BasketView />} />
                <Route path="/order" element={<OrderView />} />
                <Route path="/order/history" element={<OrderHistory />} />
              </Route>

              <Route path="/*" element={<NotFoundView />} />

            </Routes>
          </Flex>

          <FooterView />

        </Flex>
      </ShopContext.Provider>
    </ChakraProvider>
  );
};

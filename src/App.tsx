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
import { useAuth } from './hooks/useAuth';
import { RequiredAuth } from './components/RequiredAuth/RequiredAuth';
import { UnauthorizedView } from './view/UnauthorizedView';
import { Admin } from './components/Admin/Admin';
import { NavigationView } from './view/NavigationView';
import { FooterView } from './view/FooterView';
import { BasketView } from './view/BasketView';

export const App = () => {
  const [categories, setCategories] = useState<CategoryFilterResponse[]>([]);
  const [products, setProducts] = useState<ProductFilterResponse[]>([]);
  const [rankingProducts, setRankingProducts] = useState<ProductFilterResponse[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { signOut, user, setUser } = useAuth();

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

  /* useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/user/check', {
        credentials: 'include',
      });
      /!* if (res.ok) {
        const data = (await res.json()) as LoginSuccessfulResponse;
        setCurrentUser(data);
      } *!/

      const data = (await res.json()) as LoginResponse;
      if (data.isSuccess) {
        setCurrentUser(data);
      }
    })();
    console.log('test');
  }, []); */

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
              <Route path="/product/category/:categoryName" element={<ProductCategoryView />} />
              <Route path="/unauthorized" element={<UnauthorizedView />} />

              <Route element={<RequiredAuth allowedRole={[UserRole.ADMIN]} />}>
                <Route path="/product/form" element={<ProductForm />} />
                {/* <Route path="/category/form" element={<AddCategoryForm/>}/>  */}
                <Route path="/admin" element={<Admin />} />
              </Route>

              <Route element={<RequiredAuth allowedRole={[UserRole.ADMIN, UserRole.USER]} />}>
                <Route path="/basket" element={<BasketView />} />
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

import * as React from 'react';
import {
  ChakraProvider,
  Box,
  theme, Flex,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  CategoryFilterResponse, ProductFilterResponse, UserRole,
} from 'types';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Header } from './components/Header/Header';
import { LoginForm } from './components/Forms/LoginForm';
import { NotFoundView } from './view/NotFoundView';
import { ForgotPasswordForm } from './components/Forms/ForgotPasswordForm';
import { RegisterForm } from './components/Forms/RegisterForm';
import { Footer } from './components/Footer/Footer';
import { NavBar } from './components/NavBar/NavBar';
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
          <Box textAlign="center" fontSize="xl" minH="10vh" p={3}>
            <Flex
              width="100%"
              justify="space-between"
            >
              <Header />
              <ColorModeSwitcher justifySelf="flex-end" alignSelf="center" />
            </Flex>
          </Box>
          <Flex width="100%">
            <NavBar />
          </Flex>
          <Flex justify="center" align="flex-start" flexGrow={1}>

            <Routes>
              {/*
      <Route path="/category/" element={<CategoryView />} />
      <Route path="/cart" element={<CartView />} />
      <Route path="/removing-list" element={<RemovingListView />} /> */}
              <Route path="/" element={<HomeView />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/restart-password" element={<ForgotPasswordForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/product/:id" element={<SingleProductDetails />} />
              <Route path="/product/category/:categoryName" element={<ProductCategoryView />} />
              <Route path="/unauthorized" element={<UnauthorizedView />} />

              <Route element={<RequiredAuth allowedRole={UserRole.ADMIN} />}>
                <Route path="/product/form" element={<ProductForm />} />
                {/* <Route path="/category/form" element={<AddCategoryForm/>}/>  */}
                <Route path="/admin" element={<Admin />} />
              </Route>

              <Route path="/*" element={<NotFoundView />} />
            </Routes>
          </Flex>
          <Flex alignSelf="flex-end" justifySelf="flex-end" width="100vw">
            {
                user && <div>{user.userRole}</div>
            }
            <Footer />
          </Flex>
        </Flex>
      </ShopContext.Provider>
    </ChakraProvider>
  );
};

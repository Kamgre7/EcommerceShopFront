import * as React from 'react';
import {
  ChakraProvider,
  Box,
  theme, Flex,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Header } from './components/Header/Header';
import { LoginForm } from './components/Forms/LoginForm';
import { NotFoundView } from './View/NotFoundView';
import { ForgotPasswordForm } from './components/Forms/ForgotPasswordForm';
import { RegisterForm } from './components/Forms/RegisterForm';
import { Footer } from './components/Footer/Footer';
import { NavBar } from './components/NavBar/NavBar';
import { HomeView } from './View/HomeView';
import { ProductForm } from './components/Forms/ProductForm';

export const App = () => (
  <ChakraProvider theme={theme}>
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

      {/*     <Flex justify="center" pt="20px">
        <Carousel />
      </Flex> */}

      <Flex justify="center" align="flex-start" flexGrow={1}>

        <Routes>
          {/* <Route path="/product" element={<ProductView />} />
             <Route path="/product/:id" element={<SingleProductDetails />} />
      <Route path="/category/" element={<CategoryView />} />
      <Route path="/category/form" element={<AddCategoryForm />} />
      <Route path="/ranking" element={<RankingView />} />
      <Route path="/cart" element={<CartView />} />
      <Route path="/removing-list" element={<RemovingListView />} /> */}
          {/*
*/}
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/restart-password" element={<ForgotPasswordForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/product/form" element={<ProductForm />} />
          <Route path="/*" element={<NotFoundView />} />

          {/*     <Route
        path="/"
        element={
          <Navigate replace to="/product" />
          }
      /> */}
        </Routes>
      </Flex>

      <Flex alignSelf="flex-end" justifySelf="flex-end" width="100vw">
        <Footer />
      </Flex>

    </Flex>
  </ChakraProvider>
);

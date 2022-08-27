import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme, Flex,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Header } from './components/Header/Header';
import { LoginForm } from './components/Forms/LoginForm';
import { NotFoundView } from './View/NotFoundView';

export const App = () => (
  <ChakraProvider theme={theme}>

    <Box textAlign="center" fontSize="xl">
      <Grid minH="10vh" p={3}>
        <Flex
          width="100%"
          justify="space-between"
        >
          <Header />
          <ColorModeSwitcher justifySelf="flex-end" alignSelf="center" />
        </Flex>
      </Grid>
    </Box>

    <Routes>
      {/* <Route path="/product" element={<ProductView />} />
      <Route path="/product/:id" element={<SingleProductDetails />} />
      <Route path="/product/form" element={<AddProductForm />} />
      <Route path="/category/" element={<CategoryView />} />
      <Route path="/category/form" element={<AddCategoryForm />} />
      <Route path="/ranking" element={<RankingView />} />
      <Route path="/cart" element={<CartView />} />
      <Route path="/removing-list" element={<RemovingListView />} /> */}
      {/*
      <Route path="/register" element={<RegisterForm />} />
*/}
      <Route path="/login" element={<LoginForm />} />
      {/*     <Route
        path="/"
        element={
          <Navigate replace to="/product" />
          }
      /> */}
      <Route path="/*" element={<NotFoundView />} />
    </Routes>
  </ChakraProvider>
);

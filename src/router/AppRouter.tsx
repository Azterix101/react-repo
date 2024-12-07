import { Routes, Route } from 'react-router-dom';
import { Loader } from '../components/Loader';
import React, { Suspense } from 'react';

const ProductList = React.lazy(() => import('../pages/ProductList/ProductList'));
const ProductDetail = React.lazy(() => import('../pages/ProductDetail/ProductDetail'));
const Cart = React.lazy(() => import('../pages/Cart'));

export function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div style={{ padding: '1rem' }}>404 - Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

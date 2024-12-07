import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartContext, CartProvider } from './CartContext';

test('can add and remove items in cart', () => {
  const wrapper = ({ children }: any) => <CartProvider>{children}</CartProvider>;
  const { result } = renderHook(() => React.useContext(CartContext), { wrapper });

  expect(result.current?.cart).toHaveLength(0);

  const product = { id: 1, title: 'Test', price: 10, image: 'test.jpg' };
  
  act(() => {
    result.current?.addToCart(product);
  });

  expect(result.current?.cart).toHaveLength(1);
  expect(result.current?.cart[0]).toMatchObject({ id: 1, quantity: 1 });

  act(() => {
    result.current?.removeFromCart(1);
  });

  expect(result.current?.cart).toHaveLength(0);
});

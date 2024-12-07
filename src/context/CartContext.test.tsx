import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartContext, CartProvider } from './CartContext';

describe('CartContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;

  test('can add and remove items in cart', () => {
    const { result } = renderHook(() => React.useContext(CartContext), { wrapper });

    const product = { id:1, title:'Test', price:10, image:'test.jpg' };
    act(() => {
      result.current?.addToCart(product);
    });

    expect(result.current?.cart).toHaveLength(1);
    expect(result.current?.cart?.[0]).toMatchObject({ id:1, quantity:1 });

    act(() => {
      result.current?.removeFromCart(1);
    });
    expect(result.current?.cart).toHaveLength(0);
  });

  test('incrementing quantity when product already in cart', () => {
    const { result } = renderHook(() => React.useContext(CartContext), { wrapper });

    const product = { id:1, title:'Test', price:10, image:'test.jpg' };
    act(() => {
      result.current?.addToCart(product);
      result.current?.addToCart(product); // Add the same product again
    });

    expect(result.current?.cart).toHaveLength(1);
    expect(result.current?.cart?.[0]).toMatchObject({ id:1, quantity:2 });
  });

  test('removeFromCart does nothing if product not in cart', () => {
    const { result } = renderHook(() => React.useContext(CartContext), { wrapper });

    const product = { id:2, title:'Another', price:20, image:'another.jpg' };
    act(() => {
      result.current?.addToCart(product);
    });

    expect(result.current?.cart).toHaveLength(1);

    // Try removing a product with id=999 that isn't in the cart
    act(() => {
      result.current?.removeFromCart(999);
    });

    // Cart should be unchanged
    expect(result.current?.cart).toHaveLength(1);
    expect(result.current?.cart?.[0].id).toBe(2);
  });

  test('updateQuantity does nothing if quantity <= 0', () => {
    const { result } = renderHook(() => React.useContext(CartContext), { wrapper });

    const product = { id:3, title:'Third', price:15, image:'third.jpg' };
    act(() => {
      result.current?.addToCart(product);
    });

    expect(result.current?.cart?.[0].quantity).toBe(1);

    // Attempt to update to zero quantity
    act(() => {
      result.current?.updateQuantity(3, 0);
    });

    // Quantity should remain unchanged
    expect(result.current?.cart?.[0].quantity).toBe(1);
  });

  test('updateQuantity does nothing if product not in cart', () => {
    const { result } = renderHook(() => React.useContext(CartContext), { wrapper });

    const product = { id:4, title:'Fourth', price:5, image:'fourth.jpg' };
    act(() => {
      result.current?.addToCart(product);
    });

    expect(result.current?.cart?.[0].id).toBe(4);

    // Update quantity of a product not in the cart
    act(() => {
      result.current?.updateQuantity(999, 5);
    });

    // No changes should be made
    expect(result.current?.cart).toHaveLength(1);
    expect(result.current?.cart?.[0].quantity).toBe(1);
  });
});

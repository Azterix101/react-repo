import { render, screen, waitFor } from '@testing-library/react';
import ProductDetail from './ProductDetail';
import { CartContext } from '../../context/CartContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const queryClient = new QueryClient();

test('loads a product detail', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id:1, title:'Detailed Product', price:20, description:'A great product', image:'img.jpg' })
  } as Response);

  const mockAddToCart = jest.fn();

  render(
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider value={{ cart: [], addToCart: mockAddToCart, removeFromCart: jest.fn(), updateQuantity: jest.fn() }}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </CartContext.Provider>
    </QueryClientProvider>
  );

  expect(screen.getByText(/Loading product.../i)).toBeInTheDocument();

  await waitFor(() => screen.getByText('Detailed Product'));
  expect(screen.getByText('Detailed Product')).toBeInTheDocument();
  expect(screen.getByText('$20.00')).toBeInTheDocument();

  screen.getByRole('button', { name: /Add to Cart/i }).click();
  expect(mockAddToCart).toHaveBeenCalled();
});

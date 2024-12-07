import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; 

const queryClient = new QueryClient();

test('loads products and displays the "Fjallraven" product', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ([{
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    }])
  } as Response);

  const mockCartContextValue = {
    cart: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn()
  };

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <CartContext.Provider value={mockCartContextValue}>
          <ProductList />
        </CartContext.Provider>
      </MemoryRouter>
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.queryByText(/Loading products/i)).not.toBeInTheDocument();
  });

  const productElement = await screen.findByText(/Fjallraven/i);
  expect(productElement).toBeInTheDocument();
});

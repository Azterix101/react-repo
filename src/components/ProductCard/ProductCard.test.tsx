import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';
import { CartContext } from '../../context/CartContext';
import { MemoryRouter } from 'react-router-dom';

test('renders product card and adds to cart', async () => {
  const mockAddToCart = jest.fn();
  const product = { id:1, title:'Test Product', price:19.99, image:'test.jpg' };

  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <CartContext.Provider value={{ cart: [], addToCart: mockAddToCart, removeFromCart: jest.fn(), updateQuantity: jest.fn() }}>
        <ProductCard product={product} />
      </CartContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText('Test Product')).toBeInTheDocument();
  expect(screen.getByText('$19.99')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /Add to Cart/i }));
  expect(mockAddToCart).toHaveBeenCalledWith(product);
});

test('ProductCard returns null if CartContext is not provided', () => {
  const product = { id: 1, title: 'Test', price: 10, image: 'test.jpg' };
  const { container } = render(<ProductCard product={product} />);
  expect(container.firstChild).toBeNull();
});


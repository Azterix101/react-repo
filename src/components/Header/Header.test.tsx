import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { CartContext } from '../../context/CartContext';
import { MemoryRouter } from 'react-router-dom';

test('renders the header with cart count', () => {
  const mockCart = [{ id: 1, title: 'Product', price: 10, image: 'img.jpg', quantity: 1 }];
  render(
    <MemoryRouter>
      <CartContext.Provider value={{ cart: mockCart, addToCart: jest.fn(), removeFromCart: jest.fn(), updateQuantity: jest.fn() }}>
        <Header />
      </CartContext.Provider>
    </MemoryRouter>
  );
  expect(screen.getByText('My Store')).toBeInTheDocument();
  expect(screen.getByText('Cart (1)')).toBeInTheDocument();
});

test('Header renders null when CartContext is not provided', () => {
  const { queryByText } = render(<Header />);
  expect(queryByText('My Store')).toBeNull();
});


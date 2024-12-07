import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { cart, removeFromCart, updateQuantity } = cartContext;

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return <div style={{ padding: '1rem' }}>Your cart is empty.</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img src={item.image} alt={item.title} style={{ width: '50px' }} />
            <div style={{ flexGrow: 1 }}>
              <p>{item.title}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <div>
                <button onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}>-</button>
                <span style={{ margin: '0 0.5rem' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

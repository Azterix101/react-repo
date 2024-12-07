import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './Header.module.css';

export function Header() {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { cart } = cartContext;

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>My Store</Link>
      <Link to="/cart" className={styles.navLink}>Cart ({cart.length})</Link>
    </header>
  );
}

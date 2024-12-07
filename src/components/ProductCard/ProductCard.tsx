import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

interface ProductProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

export function ProductCard({ product }: ProductProps) {
  const cartContext = useContext(CartContext);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!cartContext) return null;
  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    addToCart(product);
    setAddedAnimation(true);
    // Remove the animation class after 1 second (or however long your animation lasts)
    setTimeout(() => setAddedAnimation(false), 1000);
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className={styles.image}/>
        <h3 className={styles.title}>{product.title}</h3>
      </Link>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
      <button
        className={`${styles.button} ${addedAnimation ? styles.added : ''}`}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

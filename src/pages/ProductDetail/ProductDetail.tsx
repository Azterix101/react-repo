import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const cartContext = useContext(CartContext);

  const { addToCart } = cartContext ?? { addToCart: () => {} };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error('Failed to fetch product');
      return res.json();
    },
    enabled: !!id && !!cartContext,
  });

  if (!cartContext) return null;
  if (isLoading) return <div>Loading product...</div>;
  if (isError || !data) return <div>Failed to load product</div>;

  return (
    <div className={styles.container}>
      <img src={data.image} alt={data.title} className={styles.image} />
      <div className={styles.info}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.price}>${data.price.toFixed(2)}</p>
        <p className={styles.description}>{data.description}</p>
        <button className={styles.button} onClick={() => addToCart(data)}>Add to Cart</button>
      </div>
    </div>
  );
}

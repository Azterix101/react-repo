import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './ProductList.module.css';

export default function ProductList() {
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading products...</div>;
  if (isError || !data) return <div>Failed to load products</div>;

  const filtered = data.filter((p: any) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.grid}>
        {filtered.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

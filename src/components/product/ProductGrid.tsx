import Image from 'next/image';
import ProductCard from './ProductCard';
import { products } from '@/mocks/mockProducts';
export default function ProductGrid() {
  return (
    <>
      <section className="grid-section">
        {products.map((product) => (
          <div className="grid-box" key={product.id}>
            <ProductCard
              productName={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </section>
    </>
  );
}

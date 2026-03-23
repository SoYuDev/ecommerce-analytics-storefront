'use client';
// import Image from 'next/image';
import ProductCard from './ProductCard';
import { useListProducts } from '@/hooks/products/useProducts';

export default function ProductGrid() {
  //we use the hook to obtain the products
  const { data, isLoading, isError } = useListProducts();

  if (isLoading) return <div>Cargando productos...</div>;
  if (isError) return <div>Error al cargar productos</div>;

  return (
    <>
      <section className="gridSection">
        {/* <div className="grid-box"> */}
        {data?.data.map((product) => (
          <div className="gridBox" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </section>
    </>
  );
}

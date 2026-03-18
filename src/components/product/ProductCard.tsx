import { Product } from '@/types/product';
import { products } from '@/mocks/mockProducts';
import Image from 'next/image';
import FlexibleImage from '@/app/components/FlexibleImage';

type ProductCardProps = {
  productName: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductCard({
  productName,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <>
      <section className="product-card">
        <div className="background-card">
          <FlexibleImage
            className="product-image"
            src={image}
            alt={productName}
            fill
          />
        </div>
        <div className="product-description">
          <h3>{productName}</h3>
          <strong>
            <p>{price}€</p>
          </strong>
        </div>
      </section>
    </>
  );
}

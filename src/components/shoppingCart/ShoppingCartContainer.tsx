'use client';
import ShoppingCard from '@/components/shoppingCart/ShoppingCard';
import { products } from '@/mocks/mockProducts';
import CheckoutCart from './CheckoutCart';
export default function ShoppingCartContainer() {
  return (
    <>
      <div className="ShoppingCartMainContainer">
        <section className="main-shop-container">
          {products.slice(3, 5).map((product) => (
            <div className="" key={product.id}>
              <ShoppingCard
                productName={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            </div>
          ))}
        </section>
        <section>
          <CheckoutCart></CheckoutCart>
        </section>
      </div>
    </>
  );
}

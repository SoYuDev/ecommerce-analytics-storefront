import FlexibleImage from '@/app/components/FlexibleImage';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
};
// This component represents a single product card in the product grid.
export default function ProductCard({ product }: ProductCardProps) {
  // We use the cart store to get the addToCart function, which allows us to add products to the cart when the button is clicked.
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <section className="productCard">
      <div className="backgroundCard">
        <FlexibleImage
          className="productImage"
          src={product.image}
          alt={product.name}
          fill
        />
      </div>
      <div className="product-description">
        <h3>{product.name}</h3>
        <strong>
          <p>{product.price}€</p>
        </strong>
        <button className="addToCartButton" onClick={() => addToCart(product)}>
          Añadir al carrito
        </button>
      </div>
    </section>
  );
}

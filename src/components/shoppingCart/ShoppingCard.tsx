import FlexibleImage from '@/app/components/FlexibleImage';
import { useCartStore } from '@/store/useCartStore';
import { CartItem } from '@/types/cart';

//we define the props for the ShoppingCard component, which will receive a product of type CartItem
type ShoppingCardProps = {
  product: CartItem;
};

export default function ShoppingCard({ product }: ShoppingCardProps) {
  //we use the useCartStore hook to get the removeFromCart function from our cart store
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <>
      <div className="mainShopCart">
        <div className="productShopImage">
          <FlexibleImage
            className="productImageShopcart"
            src={product.image}
            alt={product.name}
            fill
          />
        </div>
        <div>
          <div className="nameDescriptionBox">
            <div className="nameDescriptionText">
              <strong>{product.name}</strong>
              <p>{product.description}</p>
            </div>
            <div>
              <button
                className="removeProduct"
                onClick={() => {
                  removeFromCart(product.id);
                }}
              >
                <img width={40} src="/trash.png" alt="close" />
              </button>
            </div>
          </div>
          <div className="priceAndQuantity">
            <span>Precio por unidad:</span>
            <span>{product.price}€</span>
            <span>Cantidad: </span>
            {
              <div>
                <input
                  value={product.quantity}
                  className="quantityProduct"
                  type="number"
                />
              </div>
            }

            <span>Subtotal: </span>
            <span>{product.price * product.quantity}€</span>
          </div>
          <hr className="separationDelivery" />
          <div className="deliveryDescription">
            <span>Entrega en 2-3 dias laborables</span>
          </div>
        </div>
      </div>
    </>
  );
}

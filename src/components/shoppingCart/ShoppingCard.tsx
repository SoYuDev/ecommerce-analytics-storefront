import FlexibleImage from '@/app/components/FlexibleImage';

type ProductCardProps = {
  productName: string;
  description: string;
  price: number;
  image: string;
};

export default function ShoppingCard({
  productName,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <>
      <div className="main-shop-cart">
        <div className="product-shopimage">
          <FlexibleImage
            className="product-image-shopcart"
            src={image}
            alt={productName}
            width={200}
            height={200}
          />
        </div>
        <div>
          <div className="nameDescription">
            <div>
              <strong>{productName}</strong>
              <p>{description}</p>
            </div>
            <div>
              <button className="removeProduct">
                <img width={40} src="/trash.png" alt="close" />
              </button>
            </div>
          </div>
          <div className="priceAndQuantity">
            <span>Precio por unidad:</span>
            <span>{price}€</span>
            <span>Cantidad: </span>
            {/* <div>
              <input className="quantityProduct" type="number" />
            </div> */}

            <span>Subtotal: </span>
            <span>{price}€</span>
          </div>
          <div>
            <span>Entrega en 2-3 dias laborables</span>
          </div>
        </div>
      </div>
    </>
  );
}

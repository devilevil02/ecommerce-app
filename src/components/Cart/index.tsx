import Each from "../utils/Each";

import formatToDollars from "../../_utils/currency";
import useCartContext from "../../hooks/useCartContext";
import useCartStateContext from "../../hooks/useCartStateContext";

type ICartItem = {
  quantity: number;
  handleIncDec?: { onIncrement: () => void; onDecrement: () => void };
};

const CartItemQuantity = ({ quantity, handleIncDec }: ICartItem) => {
  const { onDecrement, onIncrement } = handleIncDec || {
    onDecrement: undefined,
    onIncrement: undefined,
  };
  return (
    <div
      className={`relative mr-6 inline-flex h-6 max-w-24 items-center justify-start overflow-hidden`}
    >
      <div className="flex">
        <button
          onClick={() => onDecrement && onDecrement()}
          className="w-6 rounded-full border-0 bg-neutral-200 font-bold hover:bg-neutral-300"
        >
          -
        </button>
        <span className="mx-1 inline-block w-5 text-center">{quantity}</span>
        <button
          onClick={() => onIncrement && onIncrement()}
          className="w-6 rounded-full border-0 bg-neutral-200 font-bold hover:bg-neutral-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
const { cartState, toggleCart } = useCartStateContext();
  const { cart, removeItemFromCart, genQuantityChanges } = useCartContext();

  return (
    <div
      className={`${cartState === "close" ? "right-[-700px] shadow-none" : "right-0 shadow-2xl"} fixed top-0 box-border h-screen lg:w-[600px] w-[350px] bg-white px-2 lg:px-8 transition-all duration-500`}
    >
      <div className="relative min-h-full w-full">
        <div className="my-8 mb-20 flex items-center justify-between text-4xl font-semibold">
          <h1 className="text-3xl lg:text-4xl">Your Cart</h1>
          <button onClick={toggleCart} className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-[32px] lg:w-[40px]"
            >
              <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
            </svg>
          </button>
        </div>
        <div
          className="mb-12 max-h-[70vh] w-full overflow-y-auto pb-28 pr-1"
          id="cartItems"
        >
          <Each
            of={cart.products}
            render={(item) => (
              <div className="mb-4 w-full rounded-lg border border-black px-2 py-2 lg:px-6 lg:py-4 first:mt-4 last:mb-0">
                <div className="flex items-center justify-between">
                  <div className="flex justify-start gap-4">
                    <img
                      src={`/images/${item.product_id}/${item.image}`}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="cartImage"
                    />
                    <div>
                      <h2 className="lg:text-xl h-6 overflow-y-hidden mb-2 font-semibold" title={item.name}>
                        {item.name.length > 30
                          ? item.name.slice(0, 30) + "..."
                          : item.name}
                      </h2>
                      <div className="flex lg:flex-row gap-2 flex-col">
                        <CartItemQuantity
                          quantity={item.quantity}
                          handleIncDec={genQuantityChanges(item.product_id)}
                        />
                        <span className="text-sm lg:text">
                          <strong>Total Price:</strong>{" "}
                          {formatToDollars(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    data-tooltip-id="cart-delete-icon"
                    data-tooltip-content="Remove item from cart"
                    onClick={() => removeItemFromCart(item.product_id)}
                    className="cart-delete-icon group cursor-pointer rounded-full bg-neutral-100 p-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="fill-neutral-800 group-hover:fill-red-500"
                      width={18}
                    >
                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          />
        </div>
        <div
          className="absolute bottom-0 mb-12 lg:mb-32 flex h-40 w-full items-end"
          id="checkout"
        >
          <div className="flex w-full flex-col gap-4 lg:flex-row items-center">
            <p className="w-full text-lg lg:flex justify-between text-neutral-800">
              Total:
              <span className="ml-4 text-3xl font-semibold underline">
                {formatToDollars(
                  cart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )
                )}
              </span>
            </p>
            <button className="w-full border-2 border-neutral-950 py-2 text-2xl font-semibold transition-all duration-300 hover:bg-neutral-800 hover:text-neutral-100">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

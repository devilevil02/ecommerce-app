import { createContext } from "react";

import { ICart, IProduct, UUID } from "../_types/index";

interface ICartContext {
  cart: ICart;
  addItemToCart: (product: IProduct, quantity: number) => void;
  removeItemFromCart: (product_id: UUID) => void;
  genQuantityChanges: (product_id: UUID) => {
    onDecrement: () => void;
    onIncrement: () => void;
  };
}

const cartContext = createContext<ICartContext>({
  cart: { products: [] },
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  genQuantityChanges: () => ({
    onDecrement: () => {},
    onIncrement: () => {},
  }),
});

export default cartContext;

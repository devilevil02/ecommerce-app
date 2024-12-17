import React, { ReactNode, useEffect, useState } from "react";
import cartContext from "./cartContext";
import { ICart, IProduct, UUID } from "../_types";

const CartContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [cart, setCart] = useState<ICart>({ products: [] });

  useEffect(() => {
    // get the cart, from localStorage
    const localCartStr = localStorage.getItem("cart") as string;
    if (!localCartStr) return;
    setCart(JSON.parse(localCartStr) as ICart);
  }, []);

  const addItemToCart = (product: IProduct, quantity: number) => {
    console.log("Adding");
    const { id: product_id, name, price, images } = product;
    if (cart.products.find((prod) => prod.product_id === product_id)) return;

    setCart((prev) => ({
      products: [
        ...prev.products,
        {
          product_id,
          name,
          quantity,
          price: price - (price * product.discount) / 100,
          image: images[0],
        },
      ],
    }));

    // save it to the localStorage
    localStorage.setItem(
      "cart",
      JSON.stringify({
        products: [
          ...cart.products,
          {
            product_id,
            name,
            quantity,
            price: price - (price * product.discount) / 100,
            image: images[0],
          },
        ],
      }),
    );
  };
  const removeItemFromCart = (product_id: UUID) => {
    setCart((prev) => ({
      products: prev.products.filter((prod) => prod.product_id !== product_id),
    }));
  };
  const genQuantityChanges = (product_id: UUID) => {
    const onIncrement = () => {
      setCart((prev) => ({
        products: prev.products.map((item) =>
          item.product_id === product_id
            ? { ...item, quantity: Math.min(item.quantity + 1, 5) }
            : item,
        ),
      }));
    };
    const onDecrement = () => {
      setCart((prev) => ({
        products: prev.products.map((item) =>
          item.product_id === product_id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item,
        ),
      }));
    };

    return { onDecrement, onIncrement };
  };

  return (
    <cartContext.Provider
      value={{ cart, addItemToCart, removeItemFromCart, genQuantityChanges }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;

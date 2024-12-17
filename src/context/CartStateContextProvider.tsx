import React, { useState } from "react";

import cartStateContext from "./cartStateContext";

const CartStateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartState, setCartState] = useState<"open" | "close">("close");

  const toggleCart = () => {
    setCartState((prev) => (prev === "close" ? "open" : "close"));
  };

  return (
    <cartStateContext.Provider value={{ cartState, toggleCart }}>
      {children}
    </cartStateContext.Provider>
  );
};

export default CartStateContextProvider;

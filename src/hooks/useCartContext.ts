import { useContext } from "react";

import cartContext from "../context/cartContext";

const useCartContext = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error(
      "Cart Context must be used inside CartContextProvider only!!!",
    );
  }

  return context;
};

export default useCartContext;

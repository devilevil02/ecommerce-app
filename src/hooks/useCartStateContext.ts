import { useContext } from "react";
import cartStateContext from "../context/cartStateContext";

const useCartStateContext = () => {
  const context = useContext(cartStateContext);

  if (!context)
    throw new Error(
      "Cannot use cartStateContext outside CartStateContextProvider",
    );

  return context;
};

export default useCartStateContext;

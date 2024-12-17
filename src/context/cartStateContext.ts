import { createContext } from "react";

interface ICartStateContext {
  cartState: "open" | "close";
  toggleCart: () => void;
}

const cartStateContext = createContext<ICartStateContext>({
  cartState: "close",
  toggleCart: () => {},
});

export default cartStateContext;

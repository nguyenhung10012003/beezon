import {createContext, ReactNode} from "react";

const CartContext = createContext<any>(undefined);

export const CartProvider = ({children}: { children: ReactNode }) => {
  const addToCart = (product: any) => {
  };
  const removeFromCart = (productId: string) => {
  };
  return (
    <CartContext.Provider value={{}}>
      {children}
    </CartContext.Provider>
  )
}
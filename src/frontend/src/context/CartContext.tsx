import { createContext, useCallback, useContext, useState } from "react";

interface CartContextValue {
  selectedServices: string[];
  toggleService: (name: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextValue>({
  selectedServices: [],
  toggleService: () => {},
  clearCart: () => {},
  cartCount: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = useCallback((name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name],
    );
  }, []);

  const clearCart = useCallback(() => setSelectedServices([]), []);

  return (
    <CartContext.Provider
      value={{
        selectedServices,
        toggleService,
        clearCart,
        cartCount: selectedServices.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

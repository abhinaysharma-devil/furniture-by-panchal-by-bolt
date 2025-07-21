import { createContext, ReactNode, useContext, useState } from 'react';

interface Cart {
    length: 0
}

interface CartContextType {
    cart: Cart | null;
    setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}
// Create a context
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
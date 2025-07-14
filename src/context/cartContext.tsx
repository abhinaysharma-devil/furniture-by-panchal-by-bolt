import React, { createContext, useState } from 'react';


// Create a context
export const CartContext = createContext();


// Create a provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // const addToCart = (item) => {
    //     setCart([...cart, item]);
    // };

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};
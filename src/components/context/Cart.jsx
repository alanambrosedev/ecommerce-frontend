import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );
  const addToCart = (product, size = null) => {
    let updateCart = [...cartData];

    if (cartData.length == 0) {
      updateCart.push({
        id: `${product.id}-${size}-${Date.now()}`,
        product_id: product.id,
        size: size,
        title: product.title,
        price: product.price,
        qty: 1,
        image_url: product.image_url,
      });
    }

    setCartData(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
  };

  return (
    <CartContext.Provider value={{ cartData, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart"));
      return Array.isArray(saved)
        ? saved.filter((item) => item && item.product_id)
        : [];
    } catch {
      return [];
    }
  });

  const addToCart = (product, size = null) => {
    let updateCart = [...cartData];

    updateCart = updateCart.filter((item) => item && item.product_id);

    const exists = updateCart.find(
      (item) => item.product_id === product.id && item.size === size,
    );

    if (exists) {
      updateCart = updateCart.map((item) =>
        item.product_id === product.id && item.size === size
          ? { ...item, qty: item.qty + 1 }
          : item,
      );
    } else {
      updateCart.push({
        id:
          size !== null
            ? `${product.id}-${size}-${Date.now()}`
            : `${product.id}-${Date.now()}`,
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
  const shipping = () => {
    return 30;
  };

  const subTotal = () => {
    let subtotal = 0;
    cartData.map((item) => {
      subtotal += item.qty * item.price;
    });
    return subtotal;
  };

  const grandTotal = () => {
    return subTotal() + shipping();
  };

  const updateCartItem = (itemId, newQty) => {
    const updateCart = cartData.map((item) =>
      item.id === itemId ? { ...item, qty: newQty } : item,
    );

    setCartData(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
  };

  const getQty = () => {
    let qty = 0;
    cartData.map((item) => {
      qty += parseInt(item.qty);
    });
    return qty;
  };

  const deleteCartItem = (itemId) => {
    const newCartData = cartData.filter((item) => item.id != itemId);
    setCartData(newCartData);

    localStorage.setItem("cart", JSON.stringify(newCartData));
  };
  return (
    <CartContext.Provider
      value={{
        cartData,
        addToCart,
        subTotal,
        grandTotal,
        shipping,
        updateCartItem,
        deleteCartItem,
        getQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

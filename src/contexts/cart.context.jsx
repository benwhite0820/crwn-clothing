import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItem contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // if found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // return new array with modified cartItems / new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
    // 一開始購物車什麼都沒有的話，新加入一個東西會回傳這個
    // 前面的 cartItems 是空的，只有後面的那個物件，所以整個cartItems是後面那個物件
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if quantity is equal to 1 , if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== cartItemToRemove.id
        );
    }
    // return back cartitems with matching art item with reduced quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const removeItemHandler = (cartItems, removeItem) =>
    cartItems.filter((cartItem) => cartItem.id !== removeItem.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    removeItemFromCheckout: () => {},
    totalPrice: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const price = cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );
        setTotalPrice(price);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const removeItemFromCheckout = (removeItem) => {
        setCartItems(removeItemHandler(cartItems, removeItem));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        setCartCount,
        removeItemToCart,
        removeItemFromCheckout,
        totalPrice,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

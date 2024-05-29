import { create } from 'zustand'
import type { Product } from "./products";
import { initProducts } from "./products";
import { CartItem } from "../components/Cart/CartItem";

type State = {
  products: Product[];
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
};

export const useCart = create<State>((set, get) => ({
  products: initProducts,
  cartItems: [],
  totalPrice: 0,
  addToCart: (productId: string, quantity: number) =>
    set((state) => {
      const product = state.products.find((item) => item.id === productId);
     console.log("holaaaa", initProducts);
     
      if (product) {
        const cartItem = state.cartItems.find((cartItem) => cartItem.id === productId);
  
        if (cartItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((cartItem) =>
              cartItem.id === productId
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            ),
            totalPrice: state.totalPrice + product.price * quantity,
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, { ...product, quantity }],
            totalPrice: state.totalPrice + product.price * quantity,
          };
        }
      }
  
      return state;
    }),
  removeFromCart: (productId: string) =>
    set((state) => {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === productId);

      if (itemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        const itemToRemove = updatedCartItems[itemIndex];

        if (itemToRemove.quantity > 1) {
          updatedCartItems[itemIndex] = {
            ...itemToRemove,
            quantity: itemToRemove.quantity - 1,
          };

          return {
            cartItems: updatedCartItems,
            totalPrice: state.totalPrice - itemToRemove.price,
          };
        } else {
          updatedCartItems.splice(itemIndex, 1);

          return {
            cartItems: updatedCartItems,
            totalPrice: state.totalPrice - itemToRemove.price,
          };
        }
      }

      return state;
    }),
  addProduct: (product: Product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  removeProduct: (productId: string) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
      cartItems: state.cartItems.filter((cartItem) => cartItem.id !== productId),
    })),
  updateProductPrice: (productId: string, newPrice: number) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, price: newPrice } : product
      ),
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.id === productId ? { ...cartItem, price: newPrice } : cartItem
      ),
      totalPrice: state.cartItems
        .filter((cartItem) => cartItem.id !== productId)
        .reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0) +
        state.cartItems
          .filter((cartItem) => cartItem.id === productId)
          .reduce((total, cartItem) => total + newPrice * cartItem.quantity, 0)
    })),
}));
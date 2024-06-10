import { create } from 'zustand';
import {productsdb} from '../Db/db';
import type { Product } from "./products";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type State = {
  products: Product[];
  cartItems: CartItem[];
  totalPrice: number;
  loadProducts: () => void;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
};

export const useCart = create<State>((set, get) => ({
  products: [],
  cartItems: [],
  totalPrice: 0,
  
  loadProducts: async () => {
    try {
      const products = await productsdb.toArray();
      set({ products });
    } catch (error) {
      console.error("Error loading products:", error);
    }
  },
  
  addToCart: (productId: string, quantity: number) =>
    set((state) => {
      const product = state.products.find((item) => item.id === productId);
      // console.log("productos", state.products)
  
      if (product) {
        const cartItemIndex = state.cartItems.findIndex((item) => item.id === productId);
        const updatedCartItems = [...state.cartItems];
  
        if (cartItemIndex !== -1) {
          updatedCartItems[cartItemIndex] = {
            ...updatedCartItems[cartItemIndex],
            quantity: updatedCartItems[cartItemIndex].quantity + quantity,
          };
        } else {
          updatedCartItems.push({
            ...product,
            quantity,
          });
        }
  
        const totalPrice = state.totalPrice + product.price * quantity;
  
        return {
          ...state,
          cartItems: updatedCartItems,
          totalPrice,
        };
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
import TYPES from "./actionTypes";

export const productInitialState = {
  products: [
    {
      id: 1,
      nombre: "Hamburga",
      descripcion: "Hamburguesa con queso, tomate, lechuga",
      precio: 500,
      img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
      tipo: "comida",
    },

    {
      id: 3,

      nombre: "Cafe",
      descripcion: "Cafe con chele",
      precio: 1200,
      img: "https://i.pinimg.com/564x/10/00/c8/1000c8efee2c29b9e65f84d60ab05a5c.jpg",
      tipo: "bebida",
    },
    {
      id: 4,

      nombre: "Cafesuli",
      descripcion: "Cafe con chele",
      precio: 1200,
      img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
      tipo: "bebida",
    },
    {
      id: 5,

      nombre: "Papas con cheddar",
      descripcion: "Cafe con chele",
      precio: 1200,
      img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
      tipo: "bebida",
    },
    {
      id: 6,

      nombre: "Medialuna",
      descripcion: "Cafe con chele",
      precio: 1200,
      img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
      tipo: "bebida",
    },
  ],
  cart: [],
  totalPriceShoppingCart: 0,
  modalOpen: false,
  modalCarroOpen: false,
  modalCarroState: "CLOSED",
  selectedOptions: {},
  selectedItem: null,
  modalState: "CLOSED",
};
let nextCartItemId = 1;
export const reducerCart = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      let newProduct = state.products.find(
        (product) => product.id === action.payload
      );
      newProduct.cartItemId = nextCartItemId++;
      return {
        ...state,
        cart: [...state.cart, newProduct],
        selectedOptions: {
          ...state.selectedOptions,
          [action.payload.productId]: undefined,
        },
      };
    }
    case TYPES.DELETE_PRODUCT_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((product, index) => index !== action.payload),
      };
    }
    case TYPES.DELETE_ALL_FROM_CART: {
      return productInitialState;
    }
    case TYPES.CALCULATE_TOTAL_PRICE_OF_THE_CART: {
      return {
        ...state,
        totalPriceShoppingCart: state.cart.reduce(
          (previousValue, product) => previousValue + product.precio,
          0
        ),
      };
    }
    case TYPES.OPEN_MODAL_CARRO: {
      return {
        ...state,
        modalOpenCarro: true,
        selectedItem: action.payload,
        modalState: "OPEN",
      };
    }
    case TYPES.CLOSE_MODAL_CARRO: {
      return {
        ...state,
        modalOpenCarro: false,
        selectedItem: null,
        modalState: "CLOSED",
      };
    }
    case TYPES.OPEN_MODAL: {
      return {
        ...state,
        modalOpen: true,
        selectedItem: action.payload,
        modalState: "OPEN",
      };
    }
    case TYPES.CLOSE_MODAL: {
      return {
        ...state,
        modalOpen: false,
        selectedItem: null,
        modalState: "CLOSED",
      };
    }
    case TYPES.SELECT_OPTION: {
      return {
        ...state,
        selectedOptions: {
          ...state.selectedOptions,
          [action.payload.productId]: action.payload.option,
        },
      };
    }
    case TYPES.ADD_QUANTITY: {
      const updatedCart = state.cart.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: (product.quantity || 1) + 1 }
          : product
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }
    case TYPES.REMOVE_QUANTITY: {
      const updatedCart = state.cart.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: Math.max(0, (product.quantity || 1) - 1) }
          : product
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }
    default:
      return state;
  }
  throw Error("Unknown action: " + action.type);
};

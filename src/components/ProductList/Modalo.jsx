import { useState } from "react";
import { useCart } from "../../store/useCart";
import { VscClose } from "react-icons/vsc";

export default function Modal({
  price,
  name,
  show,
  onClose,
  id,
  img,
  description,
}) {
  const { addToCart } = useCart();
  const { cartItems, removeFromCart } = useCart();
  const item = cartItems.find((item) => item.id === id);
  const initialQuantity = item ? item.quantity : 1; // Inicializar en 1 si no hay un item en el carrito
  const [quantity, setQuantity] = useState(initialQuantity);

  if (!show) return null;

  const handleDecrease = () => {
    const newQuantity = Math.max(quantity - 1, 1); // Asegura que la cantidad nunca sea menor que 1
    setQuantity(newQuantity);
    removeFromCart(id); // Remueve un producto del carrito al hacer clic en -
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(id, quantity);
    onClose(); // Cerrar el modal después de agregar al carrito
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowBotonaso(true); // Asegura que el botón vuelva a aparecer al cerrar el modal
  };

  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-end justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <p>Buffet "El Barato"</p>
                  <button
                    className="text-red-500 text-3xl"
                    type="button"
                    onClick={() => onClose()}
                  >
                    <VscClose />
                  </button>
                </div>
                <div className="relative p-6 flex-auto flex flex-col justify-start items-start">
                  <img
                    className="h-60 w-full rounded-md mr-4"
                    src={img}
                    alt={name}
                  />
                  <div className="flex items-start mb-4">
                    <div>
                      <h1 className="text-xl font-semibold">{name}</h1>
                      <p>{description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-4">Cantidad</span>
                    <button
                      className="ml-1 border bg-slate-200 p-1"
                      onClick={handleDecrease}
                    >
                      -
                    </button>
                    <p>{quantity}</p>
                    <button
                      className="ml-1 border bg-slate-200 p-1"
                      onClick={handleIncrease}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddToCart}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

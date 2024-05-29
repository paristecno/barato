import React from "react";
import { useCart } from "../../store/useCart";

const Botonaso = ({ totalItems, onClick, hidden }) => {
  // Agrega la prop hidden
  const { totalPrice } = useCart();
  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 w-80 lg:px-8 py-2 rounded-xl cursor-pointer`}
      onClick={onClick} // Llama al manejador de eventos al hacer clic
      style={{ zIndex: 9999, display: hidden ? "none" : "block" }} // Combinar los estilos aquíestilo de display
    >
      <div className="flex items-center justify-center text-center">
        {totalItems > 0 ? (
          <div className="flex items-center">
            <div className="bg-white text-black text-sm font-bold rounded-full flex justify-center items-center mr-2 w-4 h-4">
              {totalItems}
            </div>
            <p className="mr-2">Total: ${totalPrice.toLocaleString("es-AR")}</p>
          </div>
        ) : (
          <p className="">Carrito vacío</p>
        )}
        <p className="ml-3">Tu pedido →</p>
      </div>
    </div>
  );
};

export default Botonaso;

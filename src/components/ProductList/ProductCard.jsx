import { useState } from "react";
// import { useCart } from "../../store/useCart";
import Modalo from "./Modalo"
import Botonaso from "../Cart/Boton";

export const ProductCard = ({ id, img, price, name, onShowModalChange, description }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    onShowModalChange(false); // Oculta el Botonaso cuando se abre el modal de productos
  };

  const closeModal = () => {
    setShowModal(false);
    onShowModalChange(true); // Vuelve a mostrar el Botonaso cuando se cierra el modal de productos
  };

  return (
   <div className="">
      <div className="border rounded-md">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl ml-2 font-bold capitalize text-[#372b80]">{name}</h1>
            <h1 className="text-medium ml-2 font-bold text-slate-800">{description}</h1>

            <div className="flex items-center mt-2 mb-2 ml-2">
              <button
                className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                title="Agregar"
                onClick={openModal}
              >
                <svg
                  className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                  viewBox="0 0 24 24"
                  height="40px"
                  width="40px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeWidth="1.5"
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  ></path>
                  <path strokeWidth="1.5" d="M8 12H16"></path>
                  <path strokeWidth="1.5" d="M12 16V8"></path>
                </svg>
              </button>
              <p className="font-bold ml-3 text-red-400 text-lg">
                ${price.toLocaleString("es-AR")}
              </p>
            </div>
          </div>
          <img
            className="h-32 w-40 rounded-lg object-cover"
            src={img}
            alt=""
          />
        </div>
      </div>
      <Modalo
        show={showModal}
        onClose={() => {
          closeModal();
        }}
        img={img}
        name={name}
        price={price}
        id={id}
        description={description}
      />
    </div>
  );
};
import React, { useState, useEffect } from "react";
import { VscClose } from "react-icons/vsc";
import { CartItem } from "./CartItem";
import { useCart } from "../../store/useCart";
 
const ModalCarro = ({ showModal, setShowModal, setShowBotonaso }) => {
  const { cartItems, totalPrice } = useCart();
  const [section, setSection] = useState("revisar");
  const [nombre, setNombre] = useState("");
  const [horaRetiro, setHoraRetiro] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [nombreCuentaMercadoPago, setNombreCuentaMercadoPago] = useState("");
  const [cantidadEfectivo, setCantidadEfectivo] = useState("");
  const [productosDelCarrito, setProductosDelCarrito] = useState([]);
  const [minHora, setMinHora] = useState("09:00"); // Nuevo estado para la hora mínima
  const [maxHora, setMaxHora] = useState("19:45"); // Nuevo estado para la hora máxima
  const handleCloseModal = () => {
    setShowModal(false);
    setShowBotonaso(true);
  };
 
  const [errorMensaje, setErrorMensaje] = useState("");

  useEffect(() => {
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const minutosActuales = ahora.getMinutes();

    if (horaActual >= 9 && horaActual <= 19) {
      let minTime = `${horaActual}:${minutosActuales < 45 ? (minutosActuales + 15 - minutosActuales % 15).toString().padStart(2, '0') : '00'}`;
      minTime = horaActual > 18 ? "19:00" : minTime; // Asegurar que minTime no exceda el límite
      setMinHora(minTime);
    }
  }, []);
 
  const handleSiguiente = () => {
    if (section === "revisar") {
      setSection("informacion");
    } else if (section === "informacion") {
      // Verificar si se ha ingresado información en la sección "Programa tu pedido"
      if (nombre !== ""  && horaRetiro !== "") {
        setSection("metodoPago");
        setErrorMensaje(""); // Limpiar el mensaje de error si se ha completado la información
      } else {
        // Mostrar mensaje de error si no se ha completado la información
        setErrorMensaje(
          "Completa todos los campos para continuar"
        );
      }
    }
  };
 
  const handleAtras = () => {
    if (section === "informacion") {
      setSection("revisar");
    } else if (section === "metodoPago") {
      setSection("informacion");
    }
  };
 
  const handleFinalizar = () => {
    // Guardar los productos del carrito en el estado
    setProductosDelCarrito(cartItems);
 
    // Preparar la información de los productos en el formato deseado
    const productosInfo = cartItems.map((item) => {
      const { name, price, quantity } = item;
      return `${name} x ${quantity}`;
    });
 
    // Convertir la información de los productos en una cadena de texto
    const productosString = productosInfo.join("%0A"); // Separador de línea en la URL
 
    let metodoPagoText = metodoPago;
    if (metodoPago === "Efectivo") {
      metodoPagoText = `${metodoPago} y paga con $ ${cantidadEfectivo}`;
    }
 
    const numeroPedido = Math.floor(Math.random()*10000)
 
    // Resto del código para construir el enlace de WhatsApp
    const linkWhatsApp = `https://api.whatsapp.com/send/?phone=541128714096&text=Pedido%20numero%20${numeroPedido}%0APedido%20de%20${nombre}%0AHorario%20de%20retiro:%20${horaRetiro}%0AM%C3%A9todo%20de%20pago:%20${metodoPagoText}%0APrecio%20Total:%20$${totalPrice}%0AProductos:%0A${productosString}&type=phone_number&app_absent=0`;
 
    window.location.href = linkWhatsApp;
  };
 
  return (
    <>
      {showModal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 overflow-y-scroll">
            <div
              className="fixed md:items-center md:justify-center md:h-full lg:justify-start lg:top-1/2 md:flex md:w-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 rounded-lg p-4 shadow-xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              style={{ zIndex: 100000 }}
            >
              <div className="relative md:mt-5">
                <div className="absolute top-0 right-0 md:mt-[-205px]">
                  <button
                    className="text-red-400 text-3xl"
                    onClick={() => handleCloseModal()}
                  >
                    <VscClose />
                  </button>
                </div>
                {cartItems.length > 0 && (
                  <div className="mt-5 md:mt-[-190px] md:mr-10 xl:ml-36">
                    <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 rounded-lg sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                      <li
                        className={`flex items-center ml-3 ${
                          section === "revisar"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                          1
                        </span>
                        Pedido
                        {section === "revisar" && (
                          <svg
                            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 12 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m7 9 4-4-4-4M1 9l4-4-4-4"
                            ></path>
                          </svg>
                        )}
                      </li>
                      <li
                        className={`flex items-center ${
                          section === "informacion"
                            ? "text-blue-600 "
                            : "text-gray-500"
                        }`}
                      >
                        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                          2
                        </span>
                        Programar
                        <span className="hidden sm:inline-flex sm:ms-2">
                          pedido
                        </span>
                        {section === "informacion" && (
                          <svg
                            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 12 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m7 9 4-4-4-4M1 9l4-4-4-4"
                            ></path>
                          </svg>
                        )}
                      </li>
                      <li
                        className={`flex items-center ${
                          section === "metodoPago"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                          3
                        </span>
                        Confirmar ✓
                      </li>
                    </ol>
                  </div>
                )}
                <div className="mt-10">
                  {section === "revisar" && cartItems.length > 0 && (
                    <>
                      <div className="flex justify-between">
                        <h1 className="text-2xl md:text-xl mb-12 pl-2 my-2 border-l-4 font-sans font-bold border-teal-400 dark:text-gray-500">
                          Revisar pedido
                        </h1>
                        <h1 className="text-2xl md:text-xl pl-2 my-2 font-sans font-bold border-teal-400 dark:text-gray-500">
                          Total: ${totalPrice}
                        </h1>
                      </div>
                      <div className="max-h-80 md:max-h-32 overflow-y-auto">
                        {cartItems.map((item) => (
                          <CartItem key={item.id} {...item} />
                        ))}
                      </div>
                    </>
                  )}
                  {section === "revisar" && cartItems.length === 0 && (
                  <div className="flex md:pt-3 md:w-full md:h-full items-center justify-center pt-[300px]">
                      <p className="text-center text-gray-500">
                      El carrito está vacío
                    </p>
                  </div>
                  )}
                  {section === "informacion" && (
                    <div className="flex flex-col space-y-4">
                      <h1 className="text-2xl md:text-xl pl-2 mb-12 md:mb-[-10px] my-2 md:my-[-40px] border-l-4 font-sans font-bold border-teal-400 dark:text-gray-500">
                        Programa tu pedido
                      </h1>
                     <span className="font-bold text-sm">Nombre:</span>
                      <input
                        type="text"
                        placeholder="Ej:. Juan Perez"
                        className="border rounded px-3 py-2"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                      {errorMensaje && (
                        <h1 className="text-red-500 text-sm mb-4">
                          {errorMensaje}
                        </h1>
                      )}
                      <span className="text-xs font-serif text-gray-700">
                      » Si pagas con Mercado Pago poner el mismo nombre que
                        está en la cuenta «
                      </span>
                     
                        <label
                          htmlFor="time"
                          className="block   text-sm font-bold text-gray-900 "
                        >
                          Selecciona el horario de retiro:
                        </label>
                       
                        
                        <div className="relative">
 
                          <input
                            type="time"
                            id="time"
                            className="bg-gray-50 border  leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            min="09:00"
                            max="18:00"
                            value={horaRetiro}
                            onChange={(e)=>setHoraRetiro(e.target.value)}
                            required
                          />
                          <span className="font-serif block text-xs mt-2 font-medium text-gray-700"> 
                          » Evite elegir horarios cercanos a la hora actual. Minimo 30 minutos de antelación «
                       </span>
                        </div>
                     
                    </div>
                  )}
                  {section === "metodoPago" && (
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <h1 className="text-2xl md:text-3xl mb-12 pl-2 my-2 border-l-4 font-sans font-bold border-teal-400 dark:text-gray-500">
                          ¿Cómo pagas?
                        </h1>
                        <h1 className="text-2xl md:text-3xl pl-2 my-2 font-sans font-bold border-teal-400 dark:text-gray-500">
                          Total: ${totalPrice}
                        </h1>
                      </div>
                      <select
                        className="select select-bordered w-full"
                        value={metodoPago}
                        onChange={(e) => setMetodoPago(e.target.value)}
                      >
                        <option disabled value="">
                          Método de pago...
                        </option>
                        <option value="MercadoPago">Mercado Pago</option>
                        <option value="Efectivo">Efectivo</option>
                      </select>
                      {metodoPago === "MercadoPago" && (
                        <div>
                          <h1 className="text-lg font-semibold mt-4">
                            Alias:{" "}
                            <span className="text-red-600">elbarato.ok</span>{" "}
                          </h1>
                          <input
                            type="text"
                            placeholder="Nombre de tu cuenta de Mercado Pago"
                            className="border rounded px-3 py-2 mt-2 w-full"
                            value={nombreCuentaMercadoPago}
                            onChange={(e) =>
                              setNombreCuentaMercadoPago(e.target.value)
                            }
                          />
                        </div>
                      )}
                      {metodoPago === "Efectivo" && (
                        <div>
                          <h1 className="text-lg font-semibold mt-4">
                            Pone la cantidad con la que pagas:
                          </h1>
                          <input
                            type="text"
                            placeholder="Cantidad en efectivo"
                            className="border rounded w-full px-3 py-2 mt-2"
                            value={cantidadEfectivo}
                            onChange={(e) =>
                              setCantidadEfectivo(e.target.value)
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="fixed-buttons-container md:mt-[400px] mt-24 fixed w-full flex flex-col items-center">
                {section !== "metodoPago" && cartItems.length > 0 && (
                  <button
                    className="bg-emerald-500 text-white w-72 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSiguiente}
                  >
                    SIGUIENTE
                  </button>
                )}
                {section === "metodoPago" && (
                  <button
                    className="bg-emerald-500 text-white w-72 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleFinalizar}
                  >
                    REALIZAR PEDIDO
                  </button>
                )}
                {section !== "revisar" && (
                  <button
                    className="text-emerald-500 text-sm mt-3 uppercase font-semibold focus:outline-none"
                    type="button"
                    onClick={handleAtras}
                  >
                    VOLVER
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};
 
export default ModalCarro;
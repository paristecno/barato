import React from "react";

import {
  IoTimeOutline,
  IoStorefrontOutline,
  IoCarOutline,
  IoLocationOutline,
  IoCartOutline,
  IoCashOutline,
} from "react-icons/io5";

// ... (other imports)

const Banner = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Imagen ocupando más de la mitad Movil*/}
      <img
        src="https://i.postimg.cc/CL36GvHq/Dise-o-sin-t-tulo-4.png" // Reemplaza con la URL de tu imagen
        alt="Imagen"
        className="w-full h-auto max-h-[50vh] md:max-h-[70vh] md:hidden object-cover"
      />
      {/* Imagen ocupando más de la Desktop */}
      <img
        src="https://i.postimg.cc/MHcdRRn5/Dise-o-sin-t-tulo-5.png" // Reemplaza con la URL de tu imagen
        alt="Imagen"
        className="hidden w-full h-auto max-h-[70vh] md:flex object-cover"
      />

      {/* Div con tres párrafos */}
      <div className="bg-slate-50 mb-5 p-4 w-full md:w-4/5 xl:w-[990px] md:justify-start md:flex ">
        <div className=" md:mt-5 text-slate-700">
          <p className="text-base xl:text-xl font-bold flex items-center md:font-medium">
            <IoStorefrontOutline className="text-red-500 mr-1" />
            Lunes y Sábados de 08:00hs a 21:00hs
          </p>
          <p className="text-base xl:text-xl font-bold flex items-center md:font-medium">
            <IoCartOutline className="text-red-500 mr-1 font-extrabold" />
            Pedi lo que quieras
          </p>
          <p className="text-base xl:text-xl font-bold flex items-center md:font-medium">
            <IoTimeOutline className="text-red-500 mr-1 font-extrabold" />
            Elegi el horario para retirar tu pedido
          </p>
          <p className="text-base xl:text-xl font-bold flex items-center md:font-medium">
            <IoCashOutline className="text-red-500 mr-1 font-extrabold" />
            Elegi el metodo de pago y retira ¡sin fila!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;

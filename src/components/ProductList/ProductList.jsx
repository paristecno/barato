import { useCart } from "../../store/useCart";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import Botonaso from "../Cart/Boton";
import ModaloCarro from "../Cart/ModaloCarro";
import { useLiveQuery } from 'dexie-react-hooks'
import { productsdb } from '../../Db/db'
import db from '../../Db/db'


const ProductList = () => {
  const loadProducts = useCart((state) => state.loadProducts);
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  const products = useCart((state) => state.products);
  useEffect(() => {
    // console.log('Loaded products:', products);
  }, [products]);
  
  const allItems = useLiveQuery(() => productsdb.toArray(), [])
  const { totalPrice, cartItems } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [showBotonaso, setShowBotonaso] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dbProducts, setDbProducts] = useState([]);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleOpenModal = () => {
    setShowModal(true);
    setShowBotonaso(false); // Oculta el botón cuando se abre el modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowBotonaso(true); // Muestra el botón cuando se cierra el modal
  };

  // Filtrar los productos por categoría seleccionada
  const filteredProducts = allItems
    ? selectedCategory === "all"
      ? allItems
      : allItems.filter((product) => product.type === selectedCategory)
    : [];

  return (
    <div>
      <Botonaso
        totalItems={totalItems}
        onClick={handleOpenModal}
        hidden={!showBotonaso}
      />
      {showModal && (
        <ModaloCarro
          showModal={showModal}
          setShowBotonaso={setShowBotonaso}
          setShowModal={setShowModal}
          onClose={handleCloseModal} // Agrega una función para manejar el cierre del modal
        />
      )}
      <div className="flex-col flex items-center justify-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 mb-4 border border-gray-300 rounded-md"
        >
          <option value="all">Todas las categorias...</option>
          <option value="comida">Comida</option>
          <option value="bebida">Bebidas</option>
          <option value="golosina">Golosinas</option>
          <option value="dym">Desayunos y Meriendas</option>
        </select>
      </div>
      {selectedCategory === "all" && (
        <div className="bg-slate-300 md:bg-white xl:w-[970px] md:font-bold text-[#372b80] w-full md:w-4/5 md:ml-28 items-center md:text-2xl justify-center text-center md:text-start mb-2 mt-2 text-3xl">
          <p>Comida</p>
        </div>
      )}
      {selectedCategory === "comida" && (
        <div className="bg-slate-300 md:bg-white xl:w-[970px] md:font-bold text-[#372b80] w-full md:w-4/5 md:ml-28 items-center md:text-2xl justify-center text-center md:text-start mb-2 mt-2 text-3xl">
          <p>Comida</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredProducts
          .filter((product) => product.type === "comida")
          .map((product, index) => (
            <div key={index}>
              <ProductCard {...product} onShowModalChange={setShowBotonaso} />
            </div>
          ))}
      </div>
      {selectedCategory === "all" && (
        <div className="bg-slate-300 md:bg-white xl:w-[970px] md:font-bold text-[#372b80] w-full md:w-4/5 md:ml-28 items-center md:text-2xl justify-center text-center md:text-start mb-2 mt-2 text-3xl">
          <p>Bebidas</p>
        </div>
      )}
      {selectedCategory === "bebida" && (
        <div className="bg-slate-300 md:bg-white xl:w-[970px] md:font-bold text-[#372b80] w-full md:w-4/5 md:ml-28 items-center md:text-2xl justify-center text-center md:text-start mb-2 mt-2 text-3xl">
          <p>Bebidas</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredProducts
          .filter((product) => product.type === "bebida")
          .map((product, index) => (
            <div key={index}>
              <ProductCard {...product} onShowModalChange={setShowBotonaso} />
            </div>
          ))}
      </div>
      {selectedCategory === "all" && (
        <div className="bg-slate-300 md:bg-white xl:w-[970px] md:font-bold text-[#372b80] w-full md:w-4/5 md:ml-28 items-center md:text-2xl justify-center text-center md:text-start mb-2 mt-2 text-3xl">
          <p>Golosinas</p>
        </div>
      )}
      {selectedCategory === "golosina" && (
        <div className="bg-slate-300 md:bg-white xl:w-[970px] md:font-bold text-[#372b80] w-full md:w-4/5 md:ml-28 items-center md:text-2xl justify-center text-center md:text-start mb-2 mt-2 text-3xl">
          <p>Golosinas</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProducts
          .filter((product) => product.type === "golosina")
          .map((product, index) => (
            <div key={index}>
              <ProductCard {...product} onShowModalChange={setShowBotonaso} />
            </div>
          ))}
      </div>
      {selectedCategory === "all" && (
        <div className="bg-slate-300 md:bg-white xl:w-[970px] md:font-bold text-[#372b80] w-full md:w-4/5 md:ml-28 items-center md:text-2xl justify-center text-center md:text-start mb-2 mt-2 text-3xl">
          <p>Desayunos y Meriendas</p>
        </div>
      )}
      {selectedCategory === "dym" && (
        <div className="bg-slate-300 md:bg-white xl:w-[970px] md:font-bold text-[#372b80] w-full md:w-4/5 md:ml-28 items-center md:text-2xl justify-center text-center md:text-start mb-2 mt-2 text-3xl">
          <p>Desayunos y Meriendas</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProducts
          .filter((product) => product.type === "dym")
          .map((product, index) => (
            <div key={index}>
              <ProductCard {...product} onShowModalChange={setShowBotonaso} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;

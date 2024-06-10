import { useCart } from './useCart';
import { useLiveQuery } from 'dexie-react-hooks';
import { productsdb } from '../Db/db';

const ProductsProvider = () => {
  const allItems = useLiveQuery(() => productsdb.toArray(), []);
  const { setProducts } = useCart(); // Suponiendo que tienes una función setProducts en useCart para actualizar el estado de products

  // Usa un efecto para actualizar el estado de products cuando cambien los datos de la base de datos
  useEffect(() => {
    if (allItems) {
      setProducts(allItems);
    }
  }, [allItems, setProducts]);

  return null; // No renderizamos nada, ya que este componente solo se encarga de la lógica de obtención de datos
};

export default ProductsProvider;
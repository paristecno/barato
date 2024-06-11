import React, { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { productsdb } from "../Db/db"
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AppPrueba = () => {
    const allItems = useLiveQuery(() => productsdb.toArray(), [])
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
    const [editingId, setEditingId] = useState(null)
    const [editingProduct, setEditingProduct] = useState({
        name: '',
        price: '',
        description: '',
        type: '',
        img: ''
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const { username, password } = loginCredentials;
    
        // Reemplaza estas credenciales con las correctas
        const correctUsername = 'admin';
        const correctPassword = 'password';
    
        if (username === correctUsername && password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            Swal.fire('Error', 'Credenciales incorrectas', 'error');
        }
    };

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Una vez eliminado, no podrás recuperar este producto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id);
                Swal.fire(
                    '¡Eliminado!',
                    'El producto ha sido eliminado.',
                    'success'
                );
            }
        });
    };
    
    

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditingProduct(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const addProduct = async (event) => {
        event.preventDefault()
        const { name, price, description, type, img } = editingProduct

        await productsdb.add({
            name,
            price,
            description,
            type,
            img
        })

        setIsAddModalOpen(false)

        setEditingProduct({
            name: '',
            price: '',
            description: '',
            type: '',
            img: ''
        })
    }

    const deleteProduct = async (id) => productsdb.delete(id)

    const startEditing = (product) => {
        setEditingId(product.id)
        setEditingProduct({
            name: product.name,
            price: product.price,
            description: product.description,
            type: product.type,
            img: product.img
        })
        setIsEditModalOpen(true)
    }

    const updateProduct = async (id) => {
        await productsdb.update(id, { ...editingProduct })
        setEditingId(null)
        setEditingProduct({
            name: '',
            price: '',
            description: '',
            type: '',
            img: ''
        })
        setIsModalOpen(false)
    }

    return (
        
        <div className="p-4">
        {isAuthenticated ? (
            <>
              <div className="flex justify-center">
            <h1 className="text-2xl font-bold mb-4">Admin Panel | El Barato</h1>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-500 text-white border rounded px-4 py-2 hover:bg-green-600 mb-5"
            >
              + Agregar Productos
            </button>
          </div>
      
          <div className="text-lg mb-1">Todos los productos:</div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Img</th>
                  <th className="py-2 px-4 border-b">Nombre</th>
                  <th className="py-2 px-4 border-b">Precio</th>
                </tr>
              </thead>
              <tbody>
                {allItems?.map(({ id, name, price, description, type, img }) => (
                  <tr key={id}>
                    <td className="py-2 px-4 border-b">
                      <img src={img} alt={name} className="w-6 h-6 object-cover" />
                    </td>
                    <td className="py-2 px-4 border-b">{name}</td>
                    <td className="py-2 px-4 border-b">${price}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex flex-row space-x-2">
                        <button
                          onClick={() => startEditing({ id, name, price, description, type, img })}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
              <div className="relative w-auto max-w-3xl mx-auto my-6">
                <div className="bg-white p-8 rounded-lg shadow-lg relative">
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                  <h2 className="text-lg font-semibold mb-4">Agregar Nuevo Producto</h2>
                  <form onSubmit={addProduct}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      value={editingProduct.name}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    />
                    <input
                      type="text"
                      name="price"
                      placeholder="Precio"
                      value={editingProduct.price}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    />
                    <input
                      type="text"
                      name="description"
                      placeholder="Descripción"
                      value={editingProduct.description}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    />
                    <select
                      name="type"
                      value={editingProduct.type}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    >
                      <option value="" disabled>
                        Tipo
                      </option>
                      <option value="comida">Comida</option>
                      <option value="bebida">Bebidas</option>
                      <option value="dym">Desayunos y Meriendas</option>
                      <option value="golosinas">Golosinas</option>
                    </select>
                    <input
                type="text"
                name="img"
                placeholder="URL de la Imagen"
                value={editingProduct.img}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}

    {isEditModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-lg font-semibold mb-4">Editar Producto</h2>
            <form onSubmit={(e) => { e.preventDefault(); updateProduct(editingId); }}>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={editingProduct.name}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                name="price"
                placeholder="Precio"
                value={editingProduct.price}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={editingProduct.description}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <select
                name="type"
                value={editingProduct.type}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              >
                <option value="" disabled>
                  Tipo
                </option>
                <option value="comida">Comida</option>
                <option value="bebida">Bebidas</option>
                <option value="dym">Desayunos y Meriendas</option>
                <option value="golosinas">Golosinas</option>
              </select>
              <input
                type="text"
                name="img"
                placeholder="URL de la Imagen"
                value={editingProduct.img}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
            </>
        ) : (
            <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <form onSubmit={handleLoginSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={loginCredentials.username}
                            onChange={handleLoginChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={loginCredentials.password}
                            onChange={handleLoginChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
        )}
  </div>
);
}

export default AppPrueba

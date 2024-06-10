// AppPrueba.js
import React, { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import {productsdb} from "../Db/db"

const AppPrueba = () => {
    const allItems = useLiveQuery(() => productsdb.toArray(), [])
    const [editingId, setEditingId] = useState(null)
    const [editingProduct, setEditingProduct] = useState({
        name: '',
        price: '',
        description: '',
        type: '',
        img: ''
    })

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
    }

    return (
        <div>
            <h1>Prueba Productos</h1>
            <form onSubmit={addProduct}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={editingProduct.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Precio"
                    value={editingProduct.price}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Descripción"
                    value={editingProduct.description}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Tipo"
                    value={editingProduct.type}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="img"
                    placeholder="URL de Imagen"
                    value={editingProduct.img}
                    onChange={handleInputChange}
                    required
                />
                <button type='submit' className='bg-sky-300 text-white border'>Add</button>
            </form>
            <div>
                {allItems?.map(({ id, name, price, description, type, img }) => (
                    <div className='flex-row' key={id}>
                        {editingId === id ? (
                            <div className='flex justify-between'>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={editingProduct.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="Precio"
                                    value={editingProduct.price}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Descripción"
                                    value={editingProduct.description}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="type"
                                    placeholder="Tipo"
                                    value={editingProduct.type}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="img"
                                    placeholder="URL de Imagen"
                                    value={editingProduct.img}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button onClick={() => updateProduct(id)} className='bg-green-300 text-white border'>Update</button>
                                <button onClick={() => setEditingId(null)} className='bg-gray-300 text-white border'>Cancel</button>
                            </div>
                        ) : (
                            <div className='flex justify-between'>
                                <p><span>{name}</span></p>
                                <p><span>{price}</span></p>
                                <p><span>{description}</span></p>
                                <p><span>{type}</span></p>
                                <img src={img} alt={name} width="50" height="50" />
                                <div>
                                    <i onClick={() => startEditing({ id, name, price, description, type, img })} className='cursor-pointer'>Edit</i>
                                    <i onClick={() => deleteProduct(id)} className='cursor-pointer ml-2'>Delete</i>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppPrueba

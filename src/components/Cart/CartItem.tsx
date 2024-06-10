import { useCart } from "../../store/useCart";
import type { Product } from "../../store/products";
import { RiDeleteBin6Line } from "react-icons/ri";


export type CartItemProps = Product & { quantity: number };

export const CartItem = ({ id, img, name, price, quantity }: CartItemProps) => {
    const { removeFromCart } = useCart();

    // console.log("Items del carrito:", useCart(state => state.cartItems));

    return (
        <div className="flex mt-2 items-center justify-between w-full">
            <div className="flex items-center">
                <img src={img} alt={id} className="w-20 h-20 mt-1 mr-4" />
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-500"><span className="text-slate-400">x{quantity} </span><span className="capitalize">{name}</span></span>
                    </div>
                    <span>${price.toLocaleString('es-AR')}</span>
                </div>
            </div>
            <button className="text-red-500" onClick={() => removeFromCart(id)}><RiDeleteBin6Line />
</button>
        </div>
    );
};

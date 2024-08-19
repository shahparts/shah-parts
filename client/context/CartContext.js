import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import { isAuthenticated } from '@/components/Commons/Auth/Auth';


const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = async (data) => {
        if (isAuthenticated()) {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/add`, data, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if (res.status === 200) {
                    SuccessAlert(res.data.successMessage);
                    getCartProducts();
                }
                else {
                    ErrorAlert(res.data.errorMessage)
                }
            }).catch(err => {
                console.log(err)
                ErrorAlert(err?.message);
            })
        } else {
            var allEntries = localStorage.getItem("products") && JSON.parse(localStorage.getItem("products")) || [];
            allEntries.push(data);
            localStorage.setItem('products', JSON.stringify(allEntries));
            SuccessAlert("Product added to cart successfully")
            getCartProductsFromLocalStorage();
        }
    };

    const removeFromCart = async (cartId) => {
        if (isAuthenticated()) {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/delete/${cartId}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if (res.status === 200) {
                    SuccessAlert(res.data.successMessage);
                    getCartProducts();
                } else {
                    ErrorAlert(res.data.errorMessage)
                }
            }).catch(err => {
                console.log(err)
                ErrorAlert(err?.message);
            })
        } else {
            removeProductFromLSById(cartId)
        }
    };

    const getCartProducts = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/get`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                setCart(res.data?.products);
            }
            else if (res.status === 201) {
                setCart([]);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            console.log(err)
            ErrorAlert(err?.message);
        })
    }

    const clearCart = async () => {
        if (isAuthenticated()) {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/empty`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if (res.status === 200) {
                    SuccessAlert(res.data.successMessage)
                    getCartProducts();
                } else {
                    ErrorAlert(res.data.errorMessage)
                }
            }).catch(err => {
                console.log(err)
                ErrorAlert(err?.message);
            })
        } else {
            localStorage.removeItem("products");
            getCartProductsFromLocalStorage();
        }
    };


    const saveQtyToDb = async (qty, product) => {
        if (isAuthenticated()) {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/update/qty/${product?._id}`, { qtyToShop: qty, userId: isAuthenticated()?._id, productId: product?._id }, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if (res.status === 200) {
                    // SuccessAlert(res.data.successMessage);
                    getCartProducts();
                } else {
                    ErrorAlert(res.data.errorMessage);
                }
            })
        } else {
            console.log(qty);
            saveQtyToLocalStorage(product, qty);
            getCartProductsFromLocalStorage();
        }
    }




    const getCartProductsFromLocalStorage = async () => {
        const getDATA = localStorage.getItem("products") ? JSON.parse(localStorage.getItem('products')) : [];
        const unique = Array.from(getDATA.reduce((map, obj) => map.set(obj._id, obj), new Map()).values());
        setCart(unique);
    }

    const saveQtyToLocalStorage = async (product, qtyToShop) => {
        if (product, qtyToShop) {
            product.qtyToShop = qtyToShop;
            const allProd = localStorage.getItem("products") && JSON.parse(localStorage.getItem('products'));
            const newArray = allProd.filter(item => item?._id !== product?._id);
            await newArray.push(product);
            localStorage.setItem('products', JSON.stringify(newArray));
            await getCartProductsFromLocalStorage();
        }
    }

    const removeProductFromLSById = async (cartId) => {
        const allProd = localStorage.getItem("products") && JSON.parse(localStorage.getItem('products'));
        const newArray = allProd?.filter(item => item?._id !== cartId);
        await localStorage.setItem('products', JSON.stringify(newArray));
        ErrorAlert("product removed from cart");
        await getCartProductsFromLocalStorage();

    }


    useEffect(() => {
        if (isAuthenticated() && isAuthenticated()?.email) {
            getCartProducts();
        } else {
            getCartProductsFromLocalStorage();
        }

        return () => {

        }
    }, []);


    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                saveQtyToDb,
                saveQtyToLocalStorage,
                removeProductFromLSById
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    return useContext(CartContext);
}
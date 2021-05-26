
import React, { useEffect, useReducer } from 'react';
import useFirebase from '../../hooks/firebase';
import ProductContext from './context';
import ProductsReducer, { ProductInitialState } from './reducer';
import { CLEAR_PRODUCT, GET_PRODUCTS, SET_PRODUCT } from './types';

const ProductProvider = ({ children }) => {
    const fb = useFirebase();
    const [{ products = [], product = null }, dispatch] = useReducer(ProductsReducer, ProductInitialState)

    const selectProduct = (id) => {
        const [ p ] = products.filter(product => product.id === id)

        dispatch({
            type: SET_PRODUCT,
            payload: p
        })
    }

    const deleteProduct = (id) => {
        fb.db.collection('products').doc(id).delete().then(() => {
            dispatch({
                type: CLEAR_PRODUCT
            })
        })
    }

    const clearSelection = () => {
        dispatch({
            type: CLEAR_PRODUCT
        })
    }

    const editProduct = ({ id, ...data }) => {
        fb.db.collection('products').doc(id).update(data).then(() => {
            dispatch({
                type: SET_PRODUCT,
                payload: { id, ...data }
            })
        })
    }

    const getProducts = () => {
        fb.db.collection('products').onSnapshot(({ docs }) => {
            const array = []
            docs.forEach(doc => {
                array.push({ id: doc.id, ...doc.data() })
            })

            dispatch({
                type: GET_PRODUCTS,
                payload: array
            })
        })
    }

    useEffect(() => {
        getProducts()
    // eslint-disable-next-line
    }, [])

    return (
        <ProductContext.Provider
            value={{
                products,
                product,
                onSelectProduct: selectProduct,
                onEditProduct: editProduct,
                onDeleteProduct: deleteProduct,
                onClearSelection: clearSelection
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
 
export default ProductProvider;

import { createContext } from "react";

const ProductContext = createContext({
    products: [],
    product: null,
    onSelectProduct: console.log,
    onEditProduct: console.log,
    onDeleteProduct: console.log,
    onClearSelection: console.log
});

export default ProductContext
import { createContext, useContext } from "react";
import useProducts from "../hooks/useProducts";
const ProductContext = createContext();

const ProductProvider =({children}) =>{

    const productData = useProducts();

    return <ProductContext.Provider value={productData}>
        {children}
    </ProductContext.Provider>
}


const useProductContext = ()=>{
    return useContext(ProductContext);
}

export {
    ProductProvider,
    useProductContext
}
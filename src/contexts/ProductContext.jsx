import { createContext, useContext } from "react";
import useProducts from "../hooks/useProducts";

//Creazione del Contesto
const ProductContext = createContext();

//Creazione del Provider
const ProductProvider =({children}) =>{

    //Importazione Hook useProducts 
    const productData = useProducts();

    return <ProductContext.Provider value={productData}>
        {children}
    </ProductContext.Provider>
}

//Utilizzo del Contesto, per evitare importazione di 
// provider e contesto in ogni componente dove viene utilizzato

const useProductContext = ()=>{
    return useContext(ProductContext);
}

export {
    ProductProvider,
    useProductContext
}
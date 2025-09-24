import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";


export default function ProductDetail(){
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const {getSingleProduct} = useProductContext();

    let {id} = useParams();
    id = Number(id);
   


    useEffect(()=>{
        const fetchProduct = async()=>{
            try {
                setLoading(true);
                const currentProduct = await getSingleProduct(id);
                setProduct(currentProduct);
                
            } catch (err) {
                console.error(err.message);
                setError(err.message)
            }finally{
                setLoading(false);
            }
        }
        
        fetchProduct();
    }, [id, getSingleProduct])

    console.log(product);

    if(loading){
        return <h2>Caricamento in Corso...</h2>
    }

    if (error) {
    return <h2>{error || "Errore sconosciuto"}</h2>;
    }

    return <div>
        <h1>Dettaglio Prodotto</h1>
        {product ? <div>
            <h2>{product.title}</h2>
            <h3>{product.category}</h3>
            </div>
            : <div>Prodotto non Trovato</div>}
    </div>
}
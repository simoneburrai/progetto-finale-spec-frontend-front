import { Link } from "react-router-dom"
import { useProductContext } from "../contexts/ProductContext"

export default function ProductDetail({product, addFavorite, comparedProducts}){
    const {addCompared, removeCompared} = useProductContext();
    
    const selectCompared= (product, e)=>{
        if(e.target.checked){
            addCompared(product)
        }else{
            removeCompared(product.id);
        }
    }

    

    return <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center d-flex flex-column">
                <h4 className="card-title"><Link className="text-decoration-none text-primary fw-bold" to={`/products/${product.id}`}>{product.title}</Link></h4>
                <p className="text-muted mb-3">{product.category.toUpperCase()}</p>
                <button className="btn btn-outline-success mt-auto" onClick={()=>addFavorite(product)}>Aggiungi ai Preferiti</button>
                <label>Confronta questo prodotto : <input checked={comparedProducts.some(p => p.id === product.id)} type="checkbox" onChange={(e)=>selectCompared(product, e)} /></label>
              </div>
            </div>
        </div>
}

           
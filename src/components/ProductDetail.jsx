import { Link } from "react-router-dom"
import { useProductContext } from "../contexts/ProductContext"

export default function ProductDetail({product, addFavorite, comparedProductsIds}){
    const {addCompared, removeCompared, favoriteProducts} = useProductContext();

    const onChangeCompared = ()=>{
      if (comparedProductsIds.some(id => id === product.id)) {
                    removeCompared(product.id);
                  } else {
                    addCompared(product.id);
                  }

    }

    const disabledButton = favoriteProducts.some(p=> p.id === product.id) && "btn-outline-danger disabled" 
    const abledButton = "btn-outline-success"

    return <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center d-flex flex-column">
                <h4 className="card-title"><Link className="text-decoration-none text-primary fw-bold" to={`/products/${product.id}`}>{product.title}</Link></h4>
                <p className="text-muted mb-3">{product.category.toUpperCase()}</p>
                <button className={`btn  mt-auto ${disabledButton ? disabledButton : abledButton}`}onClick={()=>addFavorite(product)}>Aggiungi ai Preferiti</button>
                <label>Confronta questo prodotto : <input 
                checked={comparedProductsIds.some(id => id === product.id)} 
                type="checkbox" 
                onChange={() => onChangeCompared()} /></label>
              </div>
            </div>
        </div>
}

           
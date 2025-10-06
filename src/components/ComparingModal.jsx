import { createPortal } from "react-dom";
import { useProductContext } from "../contexts/ProductContext";
import { useEffect, useState } from "react";

//Collegamento al nodo DOM per rendering della modale
const modalRoot = document.getElementById("modal-root");

export default function ComparingModal({ productsIds, showModal, onClose, addFavorite}) {
  const [comparedProducts, setComparedProducts] = useState([]);
  const {getSingleProduct, favoriteProducts, addCompared, removeCompared, products} = useProductContext();
  const [isComparingOthers, setIsComparingOthers] = useState(false);
  const abledButton = "btn-outline-success"


  const fetchComparedProducts = async(ids)=>{
    const promisesProducts =  ids.map(id=>getSingleProduct(id));

    try{
      const fetchedProducts = await Promise.all(promisesProducts);
      setComparedProducts(prev=>[...prev, ...fetchedProducts])
    }catch (error) {
      console.error(error);
    }
    
  }

 useEffect(() => {
  if (!productsIds || productsIds.length === 0) {
    setComparedProducts([]);
    return;
  }

  const normalizedIds = productsIds.map(id => Number(id));

  setComparedProducts(prev =>
    prev.filter(p => normalizedIds.includes(p.id))
  );

  const newIds = normalizedIds.filter(
    id => !comparedProducts.some(p => p.id === id)
  );

  if (newIds.length > 0) {
    fetchComparedProducts(newIds);
  }
}, [productsIds]);


  if (!showModal || !modalRoot) return null;

  //Creazione Portale di collegamento col nodo
  return createPortal(
    <div className="modal show d-block" tabIndex="-1" aria-modal="true" onClick={onClose}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title fs-4 text-success text-center">Confronta due o più articoli</h5>
            <button type="button" className="btn-close" aria-label="Chiudi" onClick={(e)=>{
              e.stopPropagation();
              onClose();
            }}></button>
          </div>
          <div className="modal-body">
              <div className="row">
                {comparedProducts.map(product => (
                  <div key={product.id} className="d-flex justify-content-center col-md-6 card shadow-lg p-3">
                    <div >
                      {/* Immagine */}
                      <div className="text-center p-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="img-fluid rounded"
                          style={{ maxHeight: "200px", objectFit: "contain" }}
                        />
                      </div>

                      {/* Dettagli */}
                      <div className="text-center">
                        <div className="card-body">
                          <h2 className="card-title">{product.title}</h2>
                          <h5 className="text-muted mb-3">{product.brand}</h5>
                          <span className="badge bg-primary mb-3">{product.category}</span>
                          <p className="card-text">{product.description}</p>

                          <div className="mt-4 text-center p-4">
                            <span className="fs-4 fw-bold text-danger me-3">
                              € {product.discountPrice.toFixed(2)}
                            </span>
                            <span className="text-muted text-decoration-line-through">
                              € {product.price.toFixed(2)}
                            </span>
                          </div>

                          <button  className={`btn  mt-auto ${favoriteProducts.some(p=> p.id === product.id) ? 
                            "btn-outline-danger disabled" : abledButton}`} onClick={()=>addFavorite(product)}>
                            <i className="bi bi-cart-plus me-2"></i>Aggiungi ai Preferiti
                          </button>
                          <button onClick={()=>removeCompared(product.id)} className="btn mt-auto btn-outline-danger"><i className="fa-solid fa-xmark"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-danger p-3 rounded-3 text-center mx-auto" onClick={onClose}>
              Chiudi
            </button>
            <button type="button" className="btn btn-outline-primary p-3 rounded-3 text-center mx-auto" onClick={()=>setIsComparingOthers(prev=>!prev)}>Compara altri articoli</button>
            {isComparingOthers && <label className="d-flex flex-column mb-3">
              <strong className="mb-2">Seleziona Prodotto da Comparare:</strong>
              <select
                className="form-select w-auto"
                onChange={(e) => {
                  const id = Number(e.target.value);
                  if (!productsIds.includes(id)) addCompared(id); // evita duplicati
                  e.target.value = ""; // resetta la select dopo la scelta
                }}
                defaultValue=""
              >
                <option value="" disabled>— Seleziona un prodotto —</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </label>}
          </div>
        </div>
      </div>
    </div>
  , modalRoot);
}



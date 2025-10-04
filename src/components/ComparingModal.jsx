import { createPortal } from "react-dom";
import { useProductContext } from "../contexts/ProductContext";
import { useEffect, useState } from "react";

//Collegamento al nodo DOM per rendering della modale
const modalRoot = document.getElementById("modal-root");

export default function ComparingModal({ productsIds, showModal, onClose, addFavorite}) {
  const [comparedProducts, setComparedProducts] = useState([]);
  const {getSingleProduct, favoriteProducts} = useProductContext();
  const abledButton = "btn-outline-success"

  async function fetchComparedProducts(ids){
    const productsPromises = ids.map(id=>getSingleProduct(id));
    try {
      const allProducts = await Promise.all(productsPromises);
      setComparedProducts(allProducts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    if(productsIds.length >= 2){
      fetchComparedProducts(productsIds);
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="text-danger bg-light border border-danger p-3 rounded-3 text-center mx-auto" onClick={onClose}>
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  , modalRoot);
}



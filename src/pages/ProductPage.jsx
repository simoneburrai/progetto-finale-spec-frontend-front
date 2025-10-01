import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getSingleProduct, addFavorite} = useProductContext();

  let { id } = useParams();
  id = Number(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const currentProduct = await getSingleProduct(id);
        setProduct(currentProduct);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, getSingleProduct]);

  
  //Condizione Caricamento
  if (loading) {
    return <h2 className="text-center my-5">Caricamento in corso...</h2>;
  }

  //Condizione di Errore
  if (error) {
    console.log(error);
    return <h2 className="text-danger text-center my-5">Prodotto non Trovato</h2>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Dettaglio Prodotto</h1>

      {product ? (
        <div className="card shadow-lg border-0">
          <div className="row g-0">
            {/* Immagine */}
            <div className="col-md-6 text-center p-4">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid rounded"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>

            {/* Dettagli */}
            <div className="col-md-6">
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <h5 className="text-muted mb-3">{product.brand}</h5>
                <span className="badge bg-primary mb-3">{product.category}</span>
                <p className="card-text">{product.description}</p>

                <div className="mt-4">
                  <span className="fs-4 fw-bold text-danger me-3">
                    € {product.discountPrice.toFixed(2)}
                  </span>
                  <span className="text-muted text-decoration-line-through">
                    € {product.price.toFixed(2)}
                  </span>
                </div>

                <button onClick={()=>addFavorite(product)} className="btn btn-outline-success mt-auto">
                  <i className="bi bi-cart-plus me-2"></i>Aggiungi ai Preferiti
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning text-center">Prodotto non trovato</div>
      )}
    </div>
  );
}

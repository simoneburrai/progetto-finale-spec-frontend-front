import { useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";

export default function FavoriteProducts() {

const { favoriteProducts, removeFavorite } = useProductContext();

  //Se non ci sono prodotti favoriti restituisco "Lista Vuota"
  if (favoriteProducts.length === 0) {
    return (
      <div className="alert alert-warning fs-4 text-center my-5">
        Lista dei Preferiti Vuota.
        <div>
           <Link className="text-decoration-none fs-3" to="/products"> <i className="fa-solid fa-arrow-left"></i> Torna alla lista dei prodotti</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">I tuoi Preferiti</h2>
      <div className="row g-4">
        {favoriteProducts.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="text-muted mb-3">{p.category}</p>
                <button
                  className="btn btn-outline-danger mt-auto"
                  onClick={() => removeFavorite(p.id)}
                >
                  <i className="bi bi-heartbreak me-2"></i>
                  Rimuovi dai Preferiti
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

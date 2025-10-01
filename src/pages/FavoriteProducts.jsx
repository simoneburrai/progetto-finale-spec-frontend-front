import { useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
export default function FavoriteProducts() {
  const { favoriteProducts, removeFavorite, setFavoriteProducts } = useProductContext();

  //Prendo i preferiti e li setto alla creazione del componente
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    setFavoriteProducts(storedFavorites ? JSON.parse(storedFavorites) : []);
  }, []);

  // Aggiorno localStorage quando cambia la lista
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);


  
  if (favoriteProducts.length === 0) {
    return (
      <div className="alert alert-warning text-center my-5">
        Lista dei Preferiti Vuota.
        <div>
           <Link to="/products">Torna alla lista dei prodotti</Link>
        </div>
      </div>
    );
  }

  console.log(favoriteProducts);

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

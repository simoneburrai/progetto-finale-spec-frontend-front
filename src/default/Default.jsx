import { NavLink, Outlet } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

export default function Default() {
  const { favoriteProducts } = useProductContext();
  const favoriteLength = favoriteProducts.length;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* HEADER */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <NavLink
              className="navbar-brand fw-bold"
              to="/products"
              onClick={(e) => {
                e.preventDefault(); 
                window.location.href = "/products"; 
              }}
            >
              FINAL PROJECT
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink to="/products" className="nav-link">
                    Prodotti
                  </NavLink>
                </li>
                <li className="nav-item position-relative">
                  <NavLink to="/favorites" className="nav-link">
                    Preferiti
                    {favoriteLength > 0 && (
                      <span className="badge rounded-pill bg-danger ms-2">
                        {favoriteLength}
                      </span>
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* MAIN */}
      <main className="flex-grow-1 container my-5">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-1 fs-4"><strong>Simone Burrai</strong> - Progetto Finale Boolean</p>
          <p className="mb-1 fs-5 fw-bold">Classe 142</p>
          <a
            href="https://github.com/simoneburrai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-info"
          >
            <i className="fa-brands fa-github fs-1"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

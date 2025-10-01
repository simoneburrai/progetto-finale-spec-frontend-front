import { useState, useMemo, useEffect, useRef } from "react";
import { useProductContext } from "../contexts/ProductContext";
import ProductDetail from "../components/ProductDetail";
import ComparingModal from "../components/ComparingModal";
import { debounce } from "lodash";

export default function ProductList() {
  const {
    setUrl,
    products,
    loading,
    error,
    addFavorite,
    comparedProducts,
    VITE_API_PRODUCT_URL,
    categories,
    clearCompared
  } = useProductContext();


  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [onSortOption, setOnSortOption] = useState("title");
  const [onOrder, setOnOrder] = useState(1);
  const [showModal, setShowModal] = useState(false);


  // Debounce solo per aggiornare la query API
  useEffect(() => {
    const searchHandler = debounce((value) => {
      setSearchQuery(value);
    }, 600);

    searchHandler(searchInput);

    return () => {
      searchHandler.cancel();
    };
  }, [searchInput]);

  // gestione ordinamento A-Z, titolo e categorie
  const sortedProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) =>
      a[onSortOption].localeCompare(b[onSortOption])
    );
    return onOrder === 1 ? sorted : sorted.reverse();
  }, [products, onSortOption, onOrder]);

  // aggiornamento URL quando cambiano filtri (search/category)
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (selectedCategory) params.append("category", selectedCategory);

    setUrl(`${VITE_API_PRODUCT_URL}?${params.toString()}`);
    clearCompared()
  }, [searchQuery, selectedCategory, VITE_API_PRODUCT_URL, setUrl]);

  // Visualizzazione Modale quando 2 elementi sono comparati.
  useEffect(() => {
    setShowModal(comparedProducts.length === 2);
  }, [comparedProducts]);

  //Pulizia prodotti comparati al cambiamento di products (es: filtri, ricerche, ordinamenti)
  useEffect(()=>{
    clearCompared();
  }, [products])

  //Condizione di Caricamento
  if (loading) {
    return <h2>Caricamento della Lista dei Prodotti in corso...</h2>;
  }

  //Condizione di Errore
  if (error) {
    console.log(error);
    return <h2>Lista dei Prodotti non Trovata</h2>;
  }
  return (
    <div>
      <h1 className="mb-4 text-center">Lista dei Prodotti</h1>
      <div className="d-flex align-items-center justify-content-between gap-3 p-3 border rounded">
        {/* Ricerca */}
        <input
          type="text"
          className="form-control"
          placeholder="Cerca..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ maxWidth: "200px" }}
        />

        {/* Categorie */}
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Tutte le categorie</option>
          {categories.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Ordinamento */}
        <select
          className="form-select text-bold"
          value={`${onSortOption},${onOrder}`}
          onChange={(e) => {
            const [option, order] = e.target.value.split(",");
            setOnSortOption(option);
            setOnOrder(Number(order));
          }}
          style={{ maxWidth: "220px" }}
        >
          <option value={"title,1"}>Titolo A-Z</option>
          <option value={"title,-1"}>Titolo Z-A</option>
          <option value={"category,1"}>Categoria A-Z</option>
          <option value={"category,-1"}>Categoria Z-A</option>
        </select>
      </div>

      <div className="row justify-content-center m-3">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductDetail
              key={product.id}
              comparedProducts={comparedProducts}
              addFavorite={addFavorite}
              product={product}
            />
          ))
        ) : (
          <div className="text-white bg-danger p-3 text-center">Nessun Risultato Trovato</div>
        )}
      </div>

      <ComparingModal
        products={comparedProducts}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

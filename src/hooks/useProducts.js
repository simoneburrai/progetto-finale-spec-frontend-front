import { useEffect, useState } from "react";

// Legge la variabile d'ambiente per l'URL base dei prodotti
const { VITE_API_PRODUCT_URL } = import.meta.env;

export default function useProducts() {
  // URL corrente per la chiamata API
  const [url, setUrl] = useState(VITE_API_PRODUCT_URL);
  
  // Lista delle categorie disponibili
  const [categories, setCategories] = useState([]);
  
  // Lista dei prodotti recuperati dall'API
  const [products, setProducts] = useState([]);
  
  // Stato di caricamento
  const [loading, setLoading] = useState(true);
  
  // Stato di errore
  const [error, setError] = useState(null);
  
  // Lista dei prodotti preferiti dall'utente
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  
  // Lista dei prodotti selezionati per la comparazione
  const [comparedProducts, setComparedProducts] = useState([]);

  // --- Funzioni per la gestione dei prodotti comparati ---
  const addCompared = (element) => {
    setComparedProducts((prev) => {
      // Evita duplicati
      if (prev.some((p) => p.id === element.id)) return prev;
      return [...prev, element];
    });
  };

  const removeCompared = (id) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== Number(id)));
  };

  const clearCompared = ()=>{
    setComparedProducts([]);
  }

  // --- Funzioni per la gestione dei prodotti preferiti ---
  const addFavorite = (element) => {
    setFavoriteProducts((prev) => {
      // Evita duplicati
      if (prev.some((p) => p.id === element.id)) return prev;
      return [...prev, element];
    });
  };

  const removeFavorite = (id) => {
    setFavoriteProducts((prev) => prev.filter((p) => p.id !== Number(id)));
  };

  // --- Funzione per recuperare tutti i prodotti dall'API ---
  const getProducts = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Errore nella chiamata HTTP. ${response.status} : ${response.statusText}`
      );
    }

    const data = await response.json();
    setProducts(data); // aggiorna lo stato dei prodotti
    return data;
  };

  // --- Funzione per recuperare un singolo prodotto ---
  const getSingleProduct = async (productId) => {
    const response = await fetch(`${VITE_API_PRODUCT_URL}/${productId}`, {
      cache: "no-cache", // evita caching locale
    });

    if (!response.ok) {
      throw new Error(
        `Errore nella chiamata HTTP. ${response.status} : ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.product; // ritorna solo il singolo prodotto
  };

  // --- Effetto per recuperare i prodotti quando cambia l'URL ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await getProducts(url);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  // --- Effetto per estrarre le categorie uniche dai prodotti ---
  useEffect(() => {
    // Solo se ci sono prodotti e non sono già settate le categorie
    if (products.length > 0 && categories.length === 0) {
      setCategories([...new Set(products.map((p) => p.category))]);
    }
  }, [products, categories]);

  // --- Return dell'Hook: restituisce tutto ciò che serve ai componenti ---
  return {
    products,
    loading,
    error,
    setProducts,
    getProducts,
    getSingleProduct,
    favoriteProducts,
    addFavorite,
    removeFavorite,
    comparedProducts,
    addCompared,
    removeCompared,
    VITE_API_PRODUCT_URL,
    url,
    setUrl,
    categories,
    clearCompared
  };
}

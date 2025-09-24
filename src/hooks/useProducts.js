import { useEffect, useState } from "react";

const { VITE_API_PRODUCT_URL } = import.meta.env;

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    const response = await fetch(VITE_API_PRODUCT_URL);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `Errore nella chiamata HTTP.
        ${response.status} : ${response.statusText}`
      );
    }
    return data;
  };

  const getSingleProduct = async (productId) => {
    const response = await fetch(`${VITE_API_PRODUCT_URL}/${productId}`, {
  cache: "no-cache"
});
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
         `Errore nella chiamata HTTP.
        ${response.status} : ${response.statusText}`
      );
    }
    return data.product;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        setProducts(products);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    setProducts,
    getProducts,
    getSingleProduct,
  };
}

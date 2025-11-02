import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductList from "./pages/ProductList"
import ProductPage from "./pages/ProductPage"
import { ProductProvider } from "./contexts/ProductContext"
import Default from "./default/Default"
import FavoriteProducts from "./pages/FavoriteProducts"
import NotFound from "./components/NotFound"

function App() {

 return (
  <ProductProvider>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Default />}>

          <Route index element={<Navigate to="/products" replace />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/favorites" element={<FavoriteProducts />} />
        </Route>
        
        {/* Rotta 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ProductProvider>
);
}

export default App

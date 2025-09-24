import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductList from "./pages/ProductList"
import ProductDetail from "./pages/ProductDetail"
import { ProductProvider } from "./contexts/ProductContext"
import Default from "./default/Default"
import FavoriteProducts from "./pages/FavoriteProducts"

function App() {

  return <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Default/>}>
              <Route path="/products" element={<ProductList/>}/>
              <Route path="/products/:id" element={<ProductDetail/>}/>
              <Route path="/favorites" element={<FavoriteProducts/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
  </ProductProvider> 
}

export default App

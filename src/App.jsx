import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductList from "./pages/ProductList"
import { ProductProvider } from "./contexts/ProductContext"
import ProductDetail from "./pages/ProductDetail"
function App() {

  return <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/products/:id" element={<ProductDetail/>}/>
          </Routes>
      </BrowserRouter>
  </ProductProvider> 
}

export default App

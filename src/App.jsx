import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductList from "./pages/ProductList"
function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/products" element={<ProductList/>}/>
    </Routes>
  </BrowserRouter>
}

export default App

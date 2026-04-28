import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
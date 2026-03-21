import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./components/common/Shop";
import Home from "./components/common/Home";
import Product from "./components/common/Product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./components/common/Shop";
import Home from "./components/common/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

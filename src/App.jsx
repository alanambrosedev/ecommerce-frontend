import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./components/Shop";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import { ToastContainer } from "react-toastify";
import { AdminAuthRequire } from "./components/admin/AdminAuthRequire";
import { default as CategoryShow } from "./components/admin/category/Show";
import { default as CategoryCreate } from "./components/admin/category/Create";
import { default as CategoryEdit } from "./components/admin/category/Edit";
import { default as BrandShow } from "./components/admin/brand/Show";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminAuthRequire>
                <Dashboard />
              </AdminAuthRequire>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminAuthRequire>
                <CategoryShow />
              </AdminAuthRequire>
            }
          />
          <Route
            path="/admin/categories/create"
            element={
              <AdminAuthRequire>
                <CategoryCreate />
              </AdminAuthRequire>
            }
          />
          <Route
            path="/admin/categories/edit/:id"
            element={
              <AdminAuthRequire>
                <CategoryEdit />
              </AdminAuthRequire>
            }
          />
          <Route
            path="/admin/brands"
            element={
              <AdminAuthRequire>
                <BrandShow />
              </AdminAuthRequire>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;

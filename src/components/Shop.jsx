import React, { useEffect, useState } from "react";
import Layout from "./common/Layout";
import ProductImg from "../assets/images/mens/fivee.jpg";
import { Link, useSearchParams } from "react-router-dom";
import { adminToken, apiUrl } from "./common/Http";
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [catChecked, setCatChecked] = useState(() => {
    const category = searchParams.get("category");
    return category ? category.split(",") : [];
  });
  const [brandChecked, setBrandChecked] = useState(() => {
    const brand = searchParams.get("brand");
    return brand ? brand.split(",") : [];
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}get-categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories.");
      }
      const result = await response.json();
      setCategories(result.data);
    } catch (error) {
      console.error("Failed to fetch categories.", error);
    }
  };
  const fetchBrands = async () => {
    try {
      const response = await fetch(`${apiUrl}get-brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch brands.");
      }
      const result = await response.json();
      setBrands(result.data);
    } catch (error) {
      console.error("Failed to fetch brands.", error);
    }
  };
  const fetchProducts = async () => {
    let search = [];
    let params = [];
    if (catChecked.length > 0) {
      search.push(["category", catChecked]);
    }
    if (brandChecked.length > 0) {
      search.push(["brand", brandChecked]);
    }
    if (search.length > 0) {
      params = new URLSearchParams(search);
      setSearchParams(params);
    } else {
      setSearchParams([]);
    }

    try {
      const response = await fetch(`${apiUrl}get-products?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const result = await response.json();
      setProducts(result.data);
    } catch (error) {
      console.error("Failed to fetch products.", error);
    }
  };

  const handleCatSearch = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCatChecked((prev) => [...prev, value]);
    } else {
      setCatChecked((prev) => prev.filter((id) => id != value));
    }
  };

  const handleBrandSearch = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setBrandChecked((prev) => [...prev, value]);
    } else {
      setBrandChecked((prev) => prev.filter((id) => id != value));
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, [catChecked, brandChecked]);
  return (
    <Layout>
      <div className="container py-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow border-0 mb-3">
              <div className="card p-4">
                <h3 className="mb-3">Categories</h3>
                <ul>
                  {categories &&
                    categories.map((category) => {
                      return (
                        <li className="mb-2" key={category.id}>
                          <input
                            type="checkbox"
                            defaultChecked={
                              searchParams.get("category")
                                ? searchParams
                                    .get("category")
                                    .includes(category.id)
                                : false
                            }
                            value={category.id}
                            onClick={handleCatSearch}
                          />
                          <label htmlFor="" className="ps-2">
                            {category.name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="card shadow border-0 mb-3">
              <div className="card p-4">
                <h3 className="mb-3">Brands</h3>
                <ul>
                  {brands &&
                    brands.map((brand) => {
                      return (
                        <li className="mb-2" key={brand.id}>
                          <input
                            defaultChecked={
                              searchParams.get("brand")
                                ? searchParams.get("brand").includes(brand.id)
                                : false
                            }
                            type="checkbox"
                            value={brand.id}
                            onClick={handleBrandSearch}
                          />
                          <label htmlFor="" className="ps-2">
                            {brand.name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              {products &&
                products.map((product) => {
                  return (
                    <div className="col-md-4 col-6" key={product.id}>
                      <div className="product card border-0">
                        <div className="card-img">
                          <Link to="/product">
                            <img
                              src={product.image_url}
                              alt=""
                              className="w-100"
                            />
                          </Link>
                        </div>
                        <div className="card-body pt-2">
                          <Link to="/product">{product.title}</Link>
                          <div className="price">
                            ${product.price} &nbsp;
                            {product.compare_price && (
                              <span className="text-decoration-line-through">
                                ${product.compare_price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;

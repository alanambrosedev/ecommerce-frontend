import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Layout from "../../common/Layout";
import { Link } from "react-router-dom";
import { adminToken, apiUrl } from "../../common/Http";

const Show = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const result = await res.json();
      setProducts(result.data);
    } catch (error) {
      console.error("Error in fetching brands: ", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Products</h4>
            <Link className="btn btn-primary" to="/admin/products/create">
              Create
            </Link>
          </div>
          <Sidebar />
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Show;

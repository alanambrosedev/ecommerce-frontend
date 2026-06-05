import React, { useEffect, useState } from "react";
import ProductImg from "../../assets/images/mens/fivee.jpg";
import { adminToken, apiUrl } from "../common/Http";

const LatestProducts = () => {
  const [latestProduct, setLatestProduct] = useState([]);
  const fetchLatestProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}latest-products`, {
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
      setLatestProduct(result.data);
    } catch (error) {
      console.error("Failed in fetching products.", error);
    }
  };
  useEffect(() => {
    fetchLatestProducts();
  }, []);
  return (
    <section className="section-2 py-5">
      <div className="container">
        <h2>New Arrivals</h2>
        <div className="row mt-4">
          {latestProduct &&
            latestProduct.map((product) => {
              return (
                <div className="col-md-3 col-6" key={product.id}>
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={product.image_url} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-2">
                      <a href="">{product.title}</a>
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
    </section>
  );
};

export default LatestProducts;

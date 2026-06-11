import React, { useEffect, useState } from "react";
import ProductImg from "../../assets/images/mens/ten.jpg";
import { adminToken, apiUrl } from "../common/Http";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}featured-products`, {
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
      setFeaturedProduct(result.data);
    } catch (error) {
      console.error("Failed in fetching products.", error);
    }
  };
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  return (
    <section className="section-2 pt-4">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="row mt-4">
          {featuredProduct &&
            featuredProduct.map((product) => {
              return (
                <div className="col-md-3 col-6" key={product.id}>
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={product.image_url} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-2">
                      <Link to={`product/${product.id}`}>{product.title}</Link>
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

export default FeaturedProducts;

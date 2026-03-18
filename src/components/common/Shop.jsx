import React from "react";
import Layout from "./Layout";
import ProductImg from "../../assets/images/Mens/fivee.jpg";
const Shop = () => {
  return (
    <>
      <Layout>
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
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
                    <li className="mb-2">
                      <input type="checkbox" />
                      <label htmlFor="" className="ps-2">
                        Kids
                      </label>
                    </li>
                    <li className="mb-2">
                      <input type="checkbox" />
                      <label htmlFor="" className="ps-2">
                        Women
                      </label>
                    </li>
                    <li className="mb-2">
                      <input type="checkbox" />
                      <label htmlFor="" className="ps-2">
                        Men
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card shadow border-0 mb-3">
                <div className="card p-4">
                  <h3 className="mb-3">Brands</h3>
                  <ul>
                    <li className="mb-2">
                      <input type="checkbox" />
                      <label htmlFor="" className="ps-2">
                        Nike
                      </label>
                    </li>
                    <li className="mb-2">
                      <input type="checkbox" />
                      <label htmlFor="" className="ps-2">
                        Puma
                      </label>
                    </li>
                    <li className="mb-2">
                      <input type="checkbox" />
                      <label htmlFor="" className="ps-2">
                        Adidas
                      </label>
                    </li>
                    <li className="mb-2">
                      <input type="checkbox" />
                      <label htmlFor="" className="ps-2">
                        Vans
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={ProductImg} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-2">
                      <a href="">Violet Stripped Tshirt-Polo</a>
                      <div className="price">
                        $50
                        <span className="text-decoration-line-through">
                          $90
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={ProductImg} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-2">
                      <a href="">Violet Stripped Tshirt-Polo</a>
                      <div className="price">
                        $50
                        <span className="text-decoration-line-through">
                          $90
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={ProductImg} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-2">
                      <a href="">Violet Stripped Tshirt-Polo</a>
                      <div className="price">
                        $50
                        <span className="text-decoration-line-through">
                          $90
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={ProductImg} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-2">
                      <a href="">Violet Stripped Tshirt-Polo</a>
                      <div className="price">
                        $50
                        <span className="text-decoration-line-through">
                          $90
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={ProductImg} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-2">
                      <a href="">Violet Stripped Tshirt-Polo</a>
                      <div className="price">
                        $50
                        <span className="text-decoration-line-through">
                          $90
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={ProductImg} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-2">
                      <a href="">Violet Stripped Tshirt-Polo</a>
                      <div className="price">
                        $50
                        <span className="text-decoration-line-through">
                          $90
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;

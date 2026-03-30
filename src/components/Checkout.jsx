import React from "react";
import Layout from "./common/Layout";

const Checkout = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  <Link to="/shop">Shop</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <Link to="">Dummy Product</Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

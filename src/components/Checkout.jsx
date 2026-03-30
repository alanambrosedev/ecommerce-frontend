import React from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <Link to="">Checkout</Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <h3 className="border-bottom pb-3">
              <strong>Billing Details</strong>
            </h3>
            <form action="">
              <div className="row pt-3">
                <div className="col-md-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <textarea
                    type="textarea"
                    className="form-control"
                    rows={3}
                    placeholder="Address"
                    id=""
                  />
                </div>
                <div className="col-md-6">
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="State"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Zip"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Mobile"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

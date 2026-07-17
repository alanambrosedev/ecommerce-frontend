import React, { useEffect, useState } from "react";
import Sidebar from "./common/Sidebar";
import Layout from "./common/Layout";
import { apiUrl, userToken } from "./common/Http";
import { useParams } from "react-router-dom";

const Confirmation = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchOrder = async () => {
    setLoading(true);
    const res = await fetch(`${apiUrl}order-details/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch order.");
    }
    setLoading(false);
    const result = await res.json();
    setOrder(result.data);
    console.log(result.data);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <h1 className="text-center fw-bold text-success">Thank You!</h1>
          <p className="text-muted text-center">
            Your order is successfully placed.
          </p>
        </div>
        <div className="card shadow">
          <div className="card-body">
            <h3 className="fw-bold">Order Summary</h3>
            <hr />
            <div className="row">
              <div className="col-6">
                <p>
                  <strong>Order ID: </strong>
                  #2323
                </p>
                <p>
                  <strong>Date: </strong>
                  17 March 2026
                </p>
                <p>
                  <strong>Status: </strong>
                  <span className="badge bg-warning">Pending</span>
                </p>
                <p>
                  <strong>Payment Method: </strong>COD
                </p>
              </div>
              <div className="col-6">
                <p>
                  <strong>Customer: </strong>Alan
                </p>
                <p>
                  <strong>Address: </strong>Lorem ipsum
                </p>
                <p>
                  <strong>Contact:</strong>9845345745
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <table className="table-stripped table-bordered table">
                  <thead className="table-light">
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Product 1</td>
                      <td>2</td>
                      <td>$100</td>
                      <td>$200</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="text-end fw-bold" colSpan={3}>
                        Sub Total
                      </td>
                      <td>$1000</td>
                    </tr>
                    <tr>
                      <td className="text-end fw-bold" colSpan={3}>
                        Shipping
                      </td>
                      <td>$12</td>
                    </tr>
                    <tr>
                      <td className="text-end fw-bold" colSpan={3}>
                        Grand Total
                      </td>
                      <td>$1000</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-primary">View Order Details</button>
              <button className="btn btn-outline-secondary ms-2">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;

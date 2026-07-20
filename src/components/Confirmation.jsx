import React, { useEffect, useState } from "react";
import Sidebar from "./common/Sidebar";
import Layout from "./common/Layout";
import { apiUrl, userToken } from "./common/Http";
import { useParams } from "react-router-dom";
import Loader from "./common/Loader";

const Confirmation = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchOrder = async () => {
    try {
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

      const result = await res.json();
      setOrder(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning";
      case "delivered":
        return "bg-success";
      case "shipped":
        return "bg-info";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <Layout>
      {loading == true && <Loader />}

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
                  {order.id}
                </p>
                <p>
                  <strong>Date: </strong>
                  {order.created_at}
                </p>
                <p>
                  <strong>Status: </strong>
                  <span className="badge bg-warning">
                    {order?.payment_status}
                  </span>
                </p>
                <p>
                  <strong>Payment Method: </strong>
                  <span className={`badge ${getStatus(order?.status)}`}>
                    {order?.status}
                  </span>
                </p>
              </div>
              <div className="col-6">
                <p>
                  <strong>Customer: </strong>
                  {order.name}
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.address}
                </p>
                <p>
                  <strong>Contact:</strong>
                  {order.mobile}
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
                  <tbody key={order.id}>
                    {order?.items?.map((item) => (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>${item.unit_price}</td>
                        <td>${item.unit_price * item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="text-end fw-bold" colSpan={3}>
                        Sub Total
                      </td>
                      <td>${order?.sub_total}</td>
                    </tr>
                    <tr>
                      <td className="text-end fw-bold" colSpan={3}>
                        Shipping
                      </td>
                      <td>${order?.shipping}</td>
                    </tr>
                    <tr>
                      <td className="text-end fw-bold" colSpan={3}>
                        Grand Total
                      </td>
                      <td>${order?.grand_total}</td>
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

import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Layout from "../../common/Layout";
import { Link } from "react-router-dom";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";
import NoState from "../../common/NoState";

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch orders.");
      }
      const result = await res.json();
      setLoading(false);
      console.log(result.data);

      setOrders(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning";
      case "delivered":
      case "paid":
        return "bg-success";
      case "shipped":
        return "bg-info";
      case "cancelled":
      case "not paid":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Orders</h4>
          </div>
          <Sidebar />
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                {loading == true && <Loader />}
                {loading == false && orders.length == 0 && (
                  <NoState text="Orders not found." />
                )}
                {loading == false && orders.length > 0 && (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders.map((order) => {
                          return (
                            <tr key={order.id}>
                              <td className="text-primary">{order.id}</td>
                              <td>{order.name}</td>
                              <td>{order.email}</td>
                              <td>
                                ${parseFloat(order.grand_total).toFixed(2)}
                              </td>
                              <td>{order.created_at}</td>
                              <td>
                                <span
                                  className={`badge ${getStatus(order?.payment_status)}`}
                                >
                                  {order?.payment_status}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`badge ${getStatus(order?.status)}`}
                                >
                                  {order?.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShowOrders;

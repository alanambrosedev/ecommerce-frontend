import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useParams } from "react-router-dom";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}orders/${params.id}`, {
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

      setOrder(result.data);
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
    fetchOrderDetails();
  }, []);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Your Title</h4>
            <Link to="/admin/orders" className="btn btn-primary">
              Back
            </Link>
          </div>
          <Sidebar />
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-9">
                <div className="card shadow">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-md-4">
                        <h3 className="fw-bold">Order ID: #{order.id}</h3>
                        <span className={`badge ${getStatus(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="col-md-4">
                        <div className="text-secondary">Date:</div>
                        <h4 className="pt-2">{order.created_at}</h4>
                      </div>
                      <div className="col-md-4">
                        <div className="text-secondary">Payment Status:</div>
                        <span
                          className={`badge ${getStatus(order.payment_status)}`}
                        >
                          {order.payment_status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow">
                  <div className="card-body p-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;

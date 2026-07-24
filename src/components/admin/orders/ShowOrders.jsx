import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Layout from "../../common/Layout";
import { Link } from "react-router-dom";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";

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

      setOrders(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
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
              <div className="card-body p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShowOrders;

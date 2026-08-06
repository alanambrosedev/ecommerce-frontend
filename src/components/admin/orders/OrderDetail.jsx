import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useParams } from "react-router-dom";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";

const OrderDetail = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
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

      setOrder(result.data);
      setItems(result.data.items);
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
                <div className="card shadow mb-5">
                  <div className="card-body p-4">
                    {loading == true && <Loader />}
                    {loading == false && (
                      <div>
                        <div className="row">
                          <div className="col-md-4">
                            <h3 className="fw-bold">Order ID: #{order.id}</h3>
                            <span
                              className={`badge ${getStatus(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="col-md-4">
                            <div className="text-secondary">Date:</div>
                            <h4 className="pt-2">{order.created_at}</h4>
                          </div>
                          <div className="col-md-4">
                            <div className="text-secondary">
                              Payment Status:
                            </div>
                            <span
                              className={`badge ${getStatus(order.payment_status)}`}
                            >
                              {order.payment_status}
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="py-5">
                              <strong>{order.name}</strong>
                              <div>{order.email}</div>
                              <div>{order.mobile}</div>
                              <div>
                                {order.address} {order.city} {order.state}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="text-secondary pt-5">
                              Payment Method
                            </div>
                            <p>COD</p>
                          </div>
                        </div>
                        <div className="row">
                          <h3 className="pb-2 ">
                            <strong>Items</strong>
                          </h3>
                          {items.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className="row justify-content-end"
                              >
                                <div className="col-lg-12">
                                  <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                    <div className="d-flex">
                                      {item.product.image && (
                                        <img
                                          width="70"
                                          className="me-3"
                                          src={item.product.image_url}
                                          alt=""
                                        />
                                      )}

                                      <div className="d-flex flex-column">
                                        <div className="mb-2">
                                          <span>{item.name}</span>
                                        </div>
                                        <div>
                                          <button className="btn btn-size">
                                            {item.size}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex">
                                      <div>X {item.qty}</div>
                                      <div className="ps-3">$ {item.price}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          <div className="row justify-content-end">
                            <div className="col-lg-12">
                              <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                <div>Subtotal</div>
                                <div>$ {order.sub_total}</div>
                              </div>
                              <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                <div>Shipping</div>
                                <div>$ {order.shipping}</div>
                              </div>
                              <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                <div>
                                  <strong>Grand Total</strong>
                                </div>
                                <div>$ {order.grand_total}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow">
                  <div className="card-body p-4">
                    <form action="">
                      <div className="">
                        <label htmlFor="status">Status</label>
                        <select name="" id="status" className="form-control">
                          <option value="pending">Pending</option>
                          <option value="pending">Shipping</option>
                          <option value="pending">Delivered</option>
                          <option value="pending">Cancelled</option>
                        </select>
                      </div>
                      <div className="">
                        <label htmlFor="payment-status">Payment Status</label>
                        <select
                          name=""
                          id="payment-status"
                          className="form-control"
                        >
                          <option value="paid">Paid</option>
                          <option value="not paid">Not paid</option>
                        </select>
                      </div>
                    </form>
                  </div>
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

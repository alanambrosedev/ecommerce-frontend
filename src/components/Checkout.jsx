import React, { useContext, useState } from "react";
import Layout from "./common/Layout";
import { data, Link, useNavigate } from "react-router-dom";
import ProductImgOne from "../assets/images/mens/six.jpg";
import { CartContext } from "./context/Cart";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "./common/Http";
import { toast } from "react-toastify";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cartData, grandTotal, subTotal, shipping } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    // const res = await fetch(`${apiUrl}save-order`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: `Bearer ${adminToken()}`,
    //   },
    //   body: JSON.stringify(data),
    // });
    // const result = await res.json();
    // if (res.ok && res.status == 201) {
    //   toast.success(result.message);
    //   navigate("/admin/products");
    // } else {
    //   const formErrors = result.errors;
    //   Object.keys(formErrors).forEach((field) => {
    //     setError(field, { message: formErrors[field][0] });
    //   });
    // }
  };
  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="">Checkout</Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-7">
              <h3 className="border-bottom pb-3">
                <strong>Billing Details</strong>
              </h3>
              {/* <form action=""> */}
              <div className="row pt-3">
                <div className="col-md-6">
                  <div>
                    <input
                      type="text"
                      {...register("name", {
                        required: "The name field is required.",
                      })}
                      placeholder="Name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      {...register("email", {
                        required: "The email field is required.",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    />
                    {errors.email && (
                      <p className="invalid-feedback">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <textarea
                    type="textarea"
                    {...register("address", {
                      required: "The address field is required.",
                    })}
                    className="form-control"
                    rows={3}
                    placeholder="Address"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                  />
                  {errors.address && (
                    <p className="invalid-feedback">{errors.address.message}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <div>
                    <input
                      {...register("city", {
                        required: "The city field is required.",
                      })}
                      type="text"
                      placeholder="City"
                      className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    />
                    {errors.city && (
                      <p className="invalid-feedback">{errors.city.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("state", {
                        required: "The state is required.",
                      })}
                      type="text"
                      placeholder="State"
                      className={`form-control ${errors.state ? "is-invalid" : ""}`}
                    />
                    {errors.state && (
                      <p className="invalid-feedback">{errors.state.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <input
                      {...register("zip", {
                        required: "The zip is required.",
                      })}
                      type="text"
                      placeholder="Zip"
                      className={`form-control ${errors.zip ? "is-invalid" : ""}`}
                    />
                    {errors.zip && (
                      <p className="invalid-feedback">{errors.zip.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("mobile", {
                        required: "The mobile is required.",
                      })}
                      type="text"
                      placeholder="Mobile"
                      className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                    />
                    {errors.mobile && (
                      <p className="invalid-feedback">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <h3 className="border-bottom pb-3">
                <strong>Items</strong>
              </h3>
              <table className="table">
                <tbody>
                  {cartData &&
                    cartData.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td width={100}>
                            <img
                              src={item.image_url}
                              width={80}
                              alt="Product"
                            />
                          </td>
                          <td width={600}>
                            <h4>{item.title}</h4>
                            <div className="d-flex align-items-center py-2">
                              <span>{item.price}</span>
                              <div className="ps-3">
                                {item.size && (
                                  <button className="btn btn-size my-1">
                                    {item.size}
                                  </button>
                                )}
                              </div>
                              <div className="ps-5">X {item.qty}</div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <div>
                      <strong>Sub-Total:</strong>
                    </div>
                    <div>${subTotal()}</div>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <div>
                      <strong>Shipping:</strong>
                    </div>
                    <div>${shipping()}</div>
                  </div>
                  <div className="d-flex justify-content-between py-3">
                    <div>
                      <strong>Grand Total:</strong>
                    </div>
                    <div>${grandTotal()}</div>
                  </div>
                </div>
              </div>
              <h3 className="border-bottom pt-3 pb-3">
                <strong>Payment Method</strong>
              </h3>
              <div className="">
                <input
                  onClick={handlePaymentMethod}
                  type="radio"
                  value={"stripe"}
                  checked={paymentMethod == "stripe"}
                  className="ms-2"
                />
                <label htmlFor="" className="form-label ps-2">
                  Stripe
                </label>
                <input
                  onClick={handlePaymentMethod}
                  type="radio"
                  value={"cod"}
                  checked={paymentMethod == "cod"}
                  className="ms-2"
                />
                <label htmlFor="" className="form-label ps-2">
                  COD
                </label>
              </div>
              <div className="d-flex pt-4 pb-3">
                <button className="btn btn-primary">Pay Now</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;

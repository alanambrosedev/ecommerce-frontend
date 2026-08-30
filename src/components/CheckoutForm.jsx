import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl, userToken } from "./common/Http";
import { toast } from "react-toastify";
import { CartContext } from "./context/Cart";
import { useForm } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Loader from "./common/Loader";

export const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");
  const { cartData, grandTotal, subTotal, shipping, clearCart } =
    useContext(CartContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}get-profile-details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken()}`,
          },
        });

        const result = await res.json();
        if (res.ok && result.status == 200) {
          setProfile(result.data);
          reset({
            name: result.data.name,
            email: result.data.email,
            address: result.data.address,
            mobile: result.data.mobile,
            city: result.data.city,
            zip: result.data.zip,
            state: result.data.state,
          });
        } else {
          toast.error(result.message || "Failed to load user details.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });
  const navigate = useNavigate();

  const processOrder = async (data) => {
    setIsSubmitting(true);
    try {
      if (paymentMethod === "cod") {
        await saveOrder(data, "not paid");
      } else {
        const response = await fetch(`${apiUrl}payment-intent`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken()}`,
          },
          body: JSON.stringify({
            amount: grandTotal() * 100,
            description: "E-Commerce Product Purchase",
          }),
        });

        const result = await response.json();
        const clientSecret = result.clientSecret;

        if (!clientSecret) {
          toast.error(result.message || "Unable to process payment intent.");
          setIsSubmitting(false);
          return;
        }

        if (!stripe || !elements) {
          toast.error("Stripe is not ready. Please try again later.");
          setIsSubmitting(false);
          return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
          toast.error("Card element not found. Please enter card details.");
          setIsSubmitting(false);
          return;
        }

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: data.name,
              email: data.email,
              address: {
                line1: data.address,
                city: data.city,
                state: data.state,
                postal_code: data.zip,
              },
            },
          },
        });

        if (paymentResult.error) {
          toast.error(`Payment failed: ${paymentResult.error.message}`);
          setIsSubmitting(false);
        } else if (paymentResult.paymentIntent?.status === "succeeded") {
          await saveOrder(data, "paid");
        }
      }
    } catch (err) {
      console.error("Order processing error:", err);
      toast.error(err.message || "Failed to process order.");
      setIsSubmitting(false);
    }
  };

  const saveOrder = async (data, paymentStatus) => {
    try {
      const formData = {
        ...data,
        grand_total: grandTotal(),
        sub_total: subTotal(),
        discount: 0,
        shipping: shipping(),
        payment_status: paymentStatus,
        payment_method: paymentMethod,
        status: "pending",
        cart: cartData,
      };
      const res = await fetch(`${apiUrl}save-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      const orderId = result.id || result.order_id || result.data?.id;
      if (
        res.ok &&
        (result.status == 200 ||
          result.status == 201 ||
          result.status === true ||
          orderId)
      ) {
        clearCart();
        toast.success("Order placed successfully!");
        navigate(`/order/confirmation/${orderId}`);
      } else {
        toast.error(result.message || "Failed to save order.");
      }
    } catch (err) {
      console.error("Save order error:", err);
      toast.error("Network error while saving order.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  return (
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
      {loading === true && <Loader />}
      {loading === false && (
        <form
          onSubmit={handleSubmit(processOrder, () => {
            toast.error("Please fill in all required fields correctly.");
          })}
        >
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
                    {...register("address", {
                      required: "The address field is required.",
                    })}
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
                  onChange={handlePaymentMethod}
                  type="radio"
                  value={"stripe"}
                  checked={paymentMethod === "stripe"}
                  className="ms-2"
                />
                <label htmlFor="" className="form-label ps-2">
                  Stripe
                </label>
                <input
                  onChange={handlePaymentMethod}
                  type="radio"
                  value={"cod"}
                  checked={paymentMethod === "cod"}
                  className="ms-2"
                />
                <label htmlFor="" className="form-label ps-2">
                  COD
                </label>
              </div>
              {paymentMethod == "stripe" && (
                <div className="border p-3">
                  <CardElement />
                </div>
              )}
              <div className="d-flex pt-4 pb-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </button>
              </div>
              {paymentStatus && (
                <p className="alert alert-info mt-3">{paymentStatus}</p>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

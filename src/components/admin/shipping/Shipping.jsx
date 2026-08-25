import React, { useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import Loader from "../../common/Loader";
export const Shipping = () => {
  const [shipping, setShipping] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}get-shipping`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        });

        const result = await res.json();
        if (res.ok && result.status == 200) {
          setShipping(result.data);
          reset({
            shipping_charge: result.data.shipping_charge,
          });
          setLoading(false);
        } else {
          toast.error(
            result.message || "Failed to load shipping charge details.",
          );
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}shipping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.status === 200) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "Failed to save shipping charges.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Shipping</h4>
          </div>
          <Sidebar />
          <div className="col-md-9">
            {loading === true && <Loader />}
            {loading === false && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card shadow">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Shipping Charge
                      </label>
                      <input
                        {...register("shipping_charge", {
                          required: "The shipping charge field is required.",
                        })}
                        type="text"
                        className={`form-control ${errors.shipping_charge ? "is-invalid" : ""}`}
                        placeholder="Enter shipping charges"
                      />
                      {errors.shipping_charge && (
                        <p className="invalid-feedback">
                          {errors.shipping_charge.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary mt-3">Save</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
